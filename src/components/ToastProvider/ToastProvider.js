import React from "react"
import useKeyDown from "../Hooks/use-keydown"

export const ToastContext = React.createContext()

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([
    { id: crypto.randomUUID(), message: "oh no", variant: "error" },
    { id: crypto.randomUUID(), message: "Logged in", variant: "success" },
  ])

  const handleEscape = React.useCallback(() => {
    setToasts([])
  }, [])

  useKeyDown("Escape", handleEscape)

  const createToast = (message, variant) => {
    const newToast = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ]

    setToasts(newToast)
  }

  const dismissToast = (id) => {
    const newToasts = toasts.filter((toast) => {
      return toast.id !== id
    })
    setToasts(newToasts)
  }
  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
