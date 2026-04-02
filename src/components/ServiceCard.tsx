import type { Service } from '@/lib/queries'
import styles from './ServiceCard.module.css'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const number = String(service.number).padStart(2, '0')

  return (
    <div className={styles.card}>
      <span className={styles.number}>{number}</span>
      <h3 className={styles.title}>{service.title}</h3>
      <p className={styles.description}>{service.description}</p>
    </div>
  )
}
