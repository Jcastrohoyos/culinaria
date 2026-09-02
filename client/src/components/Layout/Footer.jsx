import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.col}>
          <div className={styles.brand}>
            <span className={`material-symbols-outlined ${styles.brandIcon}`}>
              local_dining
            </span>
            <span className={styles.brandName}>Culinaria</span>
          </div>
          <p className={styles.tagline}>
            Escuela de cocina en Bogotá. Aprende el arte culinario colombiano
            y del mundo desde tu propia cocina.
          </p>
        </div>

        <div className={styles.col}>
          <h4 className={styles.heading}>Conecta</h4>
          <div className={styles.socialRow}>
            <button className={styles.socialBtn} aria-label="Sitio web">
              <span className="material-symbols-outlined">public</span>
            </button>
            <button className={styles.socialBtn} aria-label="Compartir">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button className={styles.socialBtn} aria-label="Email">
              <span className="material-symbols-outlined">alternate_email</span>
            </button>
          </div>
          <p className={styles.email}>info@culinaria.com.co</p>
        </div>

        <div className={styles.col}>
          <h4 className={styles.heading}>Localización</h4>
          <p className={styles.address}>
            Sede Principal: Calle 85, Bogotá, Colombia.<br />
            Lunes – Sábado: 8:00 AM – 9:00 PM
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.divider} />
        <p className={styles.copy}>
          © 2024 Culinaria. Escuela de cocina en Bogotá. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
