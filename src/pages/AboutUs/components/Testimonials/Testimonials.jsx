import styles from './Testimonials.module.css';

const testimonials = [
    {
        name: 'Sarah Chen',
        role: 'Marathon Runner',
        avatar: 'src/assets/avatar1.jpg',
        quote: '"FitTrack transformed my training. The adaptive plans kept me challenged while preventing burnout."'
    },
    {
        name: 'Marcus Thompson',
        role: 'Powerlifter',
        avatar: 'src/assets/avatar2.jpg',
        quote: '"The community aspect is incredible. I\'ve made lifelong friends and training partners here."'
    },
    {
        name: 'Elena Rodriguez',
        role: 'CrossFit Competitor',
        avatar: 'src/assets/avatar3.jpg',
        quote: '"Finally, a platform that understands real athlete needs. The analytics are game-changing."'
    }
];

export function Testimonials() {
    return (
        <section className={styles.testimonials}>
            <h2 className={styles.title}>What Athletes Say</h2>

            <div className={styles.grid}>
                {testimonials.map((testimonial, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.stars}>
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                        </div>
                        <p className={styles.quote}>{testimonial.quote}</p>
                        <div className={styles.author}>
                            <img src={testimonial.avatar} alt={testimonial.name} className={styles.avatar} />
                            <div className={styles.info}>
                                <span className={styles.name}>{testimonial.name}</span>
                                <span className={styles.role}>{testimonial.role}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}