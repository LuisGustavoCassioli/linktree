/**
 * @typedef {Object} Link
 * @property {string} title
 * @property {string} url
 */

/**
 * @typedef {Object} Profile
 * @property {string} name
 * @property {string} bio
 * @property {string} avatar
 * @property {Link[]} links
 */

/**
 * Retorna os dados do perfil e funções de inicialização para o Alpine.js
 * @returns {Object}
 */
function profileData() {
    return {
        profile: {
            name: 'Luis Gustavo Cassioli',
            bio: 'engenheiro_de_software && desenvolvedor_web',
            avatar: '../images/chatgpt ',
            links: [
                { title: 'meu_portfolio.sh', url: 'https://portfolio-luisgustavocassiolidev.vercel.app/' },
                { title: 'github', url: 'https://github.com/LuisGustavoCassioli' },
                { title: 'linkedin', url: 'https://www.linkedin.com/in/luis-gustavo-cassioli-rodrigues' },
                { title: 'curriculo.pdf_', url: '#' },
                { title: 'contato.sh_', url: 'mailto:luisgustavocassiolirodrigues@gmail.com' }
            ]
        },

        init() {
            // Aguarda a renderização do Alpine
            this.$nextTick(() => {
                this.initTyped();
                this.animateLinks();
                this.animateGlitch();
            });
        },

        initTyped() {
            // Efeito de digitação no nome
            new Typed('#typed-name', {
                strings: [this.profile.name],
                typeSpeed: 60,
                showCursor: true,
                cursorChar: '_',
                onComplete: (self) => {
                    self.cursor.remove(); // Remove cursor do nome após terminar
                    // Inicia a bio apenas quando o nome terminar
                    new Typed('#typed-bio', {
                        strings: [this.profile.bio],
                        typeSpeed: 40,
                        showCursor: true,
                        cursorChar: '_'
                    });
                }
            });
        },

        animateLinks() {
            const links = document.querySelectorAll('.link-card');

            if (links.length > 0) {
                gsap.fromTo(links,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.3,
                        stagger: 0.15,
                        ease: 'power2.out',
                        delay: 1.5 // Aguarda o nome ser digitado
                    }
                );
            }
        },

        animateGlitch() {
            const title = document.querySelector('.glitch-title');

            if (!title) return;

            // Animação contínua e aleatória para o glitch sutil
            const doGlitch = () => {
                gsap.to(title, {
                    x: () => (Math.random() - 0.5) * 4, // Movimento de -2px a 2px
                    y: () => (Math.random() - 0.5) * 4,
                    opacity: () => Math.random() * 0.3 + 0.7, // 70% a 100%
                    duration: 0.1,
                    onComplete: () => {
                        // Volta ao estado normal e agenda o próximo glitch
                        gsap.set(title, { x: 0, y: 0, opacity: 1 });
                        setTimeout(doGlitch, Math.random() * 4000 + 2000); // 2s a 6s
                    }
                });
            };

            // Inicia o loop de glitch
            setTimeout(doGlitch, 3000);
        }
    };
}
