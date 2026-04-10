import ContactForm from '@/components/ContactForm'
import { CustomCursor } from '@/components/CustomCursor'
import styles from './page.module.css'

export const metadata = {
  title: 'Contact — Zachary Kiernan',
}

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <CustomCursor variant="pencil" />
      <div className={styles.inner}>
        <h1>So great to meet ya!</h1>
        <p className={styles.intro}>
          Please answer the questions below to the best of your ability. Once we receive your general information, we can set up a phone call to discuss the details or your business, creative visions and any other pertinent information. Excited to hear from you! 
        </p>
        <ContactForm />
      </div>
    </main>
  )
}
