export default function FooterMap() {
  return (
    <div className="footer-map" aria-label="Mapa da clínica">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.861641784464!2d-49.6767478!3d-3.8398640000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92bf8adc41882cb3%3A0xacf802172a924a9c!2sIMIMI%20Instituto%20de%20Medicina%20Interna%20e%20Materno%20Infantil!5e0!3m2!1spt-BR!2sco!4v1779751121612!5m2!1spt-BR!2sco"
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa da clínica"
      />
    </div>
  );
}
