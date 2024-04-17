import React, { useState } from "react"
import { ToastContext } from "../ToastProvider"
import Button from "../Button"
import styles from "./ToastPlayground.module.css"
import ToastShelf from "../ToastShelf/ToastShelf"

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"]

function ToastPlayground() {
  const { createToast } = React.useContext(ToastContext)
  const [message, setMessage] = useState("")
  const [variant, setVariant] = useState(VARIANT_OPTIONS[0])
  const textareaRef = React.useRef()
  React.useEffect(() => {
    textareaRef.current.focus()
  }, [])

  const handleCreateToast = (event) => {
    event.preventDefault()
    createToast(message, variant)

    setMessage("")
    setVariant(VARIANT_OPTIONS[0])
    textareaRef.current.focus()
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form className={styles.controlsWrapper} onSubmit={handleCreateToast}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              ref={textareaRef}
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => {
              const id = `variant-${option}`
              return (
                <label key={id} htmlFor={id}>
                  <input
                    id={id}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={option === variant}
                    onChange={(event) => setVariant(event.target.value)}
                  />
                  {option}
                </label>
              )
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ToastPlayground
