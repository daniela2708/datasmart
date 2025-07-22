import { useState, useCallback } from 'react'

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
}

type ToastInput = Omit<Toast, 'id'>

export const useToasts = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: ToastInput): string => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = {
      id,
      duration: 5000,
      variant: 'default',
      position: 'bottom-right',
      ...toast
    }
    
    setToasts(prev => [...prev, newToast])

    // Auto-remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }

    return id
  }, [removeToast])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const removeAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  const updateToast = useCallback((id: string, updates: Partial<ToastInput>) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id ? { ...toast, ...updates } : toast
    ))
  }, [])

  // Métodos de conveniencia para diferentes tipos de toast
  const success = useCallback((title: string, description?: string, options?: Partial<ToastInput>) => {
    return addToast({ 
      title, 
      description, 
      variant: 'success',
      ...options 
    })
  }, [addToast])

  const error = useCallback((title: string, description?: string, options?: Partial<ToastInput>) => {
    return addToast({ 
      title, 
      description, 
      variant: 'destructive',
      duration: 0, // Los errores no se auto-eliminan por defecto
      ...options 
    })
  }, [addToast])

  const warning = useCallback((title: string, description?: string, options?: Partial<ToastInput>) => {
    return addToast({ 
      title, 
      description, 
      variant: 'warning',
      ...options 
    })
  }, [addToast])

  const info = useCallback((title: string, description?: string, options?: Partial<ToastInput>) => {
    return addToast({ 
      title, 
      description, 
      variant: 'info',
      ...options 
    })
  }, [addToast])

  const loading = useCallback((title: string, description?: string, options?: Partial<ToastInput>) => {
    return addToast({ 
      title, 
      description, 
      variant: 'default',
      duration: 0, // Los loading no se auto-eliminan
      ...options 
    })
  }, [addToast])

  // Función para mostrar toast de promesa (útil para operaciones async)
  const promise = useCallback(<T,>(
    promise: Promise<T>,
    {
      loading: loadingToast,
      success: successToast,
      error: errorToast
    }: {
      loading: ToastInput
      success: (data: T) => ToastInput
      error: (error: Error | unknown) => ToastInput
    }
  ) => {
    const loadingId = addToast(loadingToast)

    promise
      .then((data) => {
        removeToast(loadingId)
        addToast(successToast(data))
      })
      .catch((error) => {
        removeToast(loadingId)
        addToast(errorToast(error))
      })

    return promise
  }, [addToast, removeToast])

  return {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
    updateToast,
    success,
    error,
    warning,
    info,
    loading,
    promise
  }
}

// Hook global para usar toasts en cualquier parte de la aplicación
let globalToastsHook: ReturnType<typeof useToasts> | null = null

export const setGlobalToastsHook = (hook: ReturnType<typeof useToasts>) => {
  globalToastsHook = hook
}

export const toast = {
  success: (title: string, description?: string, options?: Partial<ToastInput>) => {
    return globalToastsHook?.success(title, description, options)
  },
  error: (title: string, description?: string, options?: Partial<ToastInput>) => {
    return globalToastsHook?.error(title, description, options)
  },
  warning: (title: string, description?: string, options?: Partial<ToastInput>) => {
    return globalToastsHook?.warning(title, description, options)
  },
  info: (title: string, description?: string, options?: Partial<ToastInput>) => {
    return globalToastsHook?.info(title, description, options)
  },
  loading: (title: string, description?: string, options?: Partial<ToastInput>) => {
    return globalToastsHook?.loading(title, description, options)
  },
  dismiss: (id?: string) => {
    if (id) {
      globalToastsHook?.removeToast(id)
    } else {
      globalToastsHook?.removeAllToasts()
    }
  },
  promise: globalToastsHook?.promise
} 