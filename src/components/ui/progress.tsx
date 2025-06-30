import React from 'react'

interface ProgressProps {
  value?: number
  max?: number
  className?: string
  indicatorClassName?: string
  size?: 'sm' | 'default' | 'lg'
  variant?: 'default' | 'secondary' | 'destructive' | 'success'
}

export const Progress: React.FC<ProgressProps> = ({
  value = 0,
  max = 100,
  className = '',
  indicatorClassName = '',
  size = 'default',
  variant = 'default'
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizeClasses = {
    sm: 'h-2',
    default: 'h-4',
    lg: 'h-6'
  }

  const variantClasses = {
    default: 'bg-primary',
    secondary: 'bg-secondary',
    destructive: 'bg-destructive',
    success: 'bg-green-500'
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-full bg-secondary ${sizeClasses[size]} ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <div
        className={`h-full w-full flex-1 transition-all duration-300 ease-in-out ${variantClasses[variant]} ${indicatorClassName}`}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  )
}

interface CircularProgressProps {
  value?: number
  max?: number
  size?: number
  strokeWidth?: number
  className?: string
  variant?: 'default' | 'secondary' | 'destructive' | 'success'
  showValue?: boolean
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  className = '',
  variant = 'default',
  showValue = false
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  const variantColors = {
    default: 'stroke-primary',
    secondary: 'stroke-secondary',
    destructive: 'stroke-destructive',
    success: 'stroke-green-500'
  }

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted-foreground/20"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`transition-all duration-500 ease-in-out ${variantColors[variant]}`}
        />
      </svg>
      {showValue && (
        <span className="absolute text-sm font-medium">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  )
}

interface ProgressStepProps {
  steps: string[]
  currentStep: number
  className?: string
}

export const ProgressStep: React.FC<ProgressStepProps> = ({
  steps,
  currentStep,
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors ${
                index <= currentStep
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-muted-foreground/20 bg-background text-muted-foreground'
              }`}
            >
              {index + 1}
            </div>
            <span className={`mt-2 text-xs ${
              index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`mx-4 h-0.5 flex-1 transition-colors ${
                index < currentStep ? 'bg-primary' : 'bg-muted-foreground/20'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
} 