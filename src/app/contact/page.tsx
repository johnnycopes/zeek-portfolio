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
        <h1>Get in Touch</h1>
        <p className={styles.intro}>
          Have a project in mind? I&apos;d love to hear about it.
        </p>
        <ContactForm />
      </div>
    </main>
  )
}
