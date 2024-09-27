const { createApp } = Vue;

createApp({
    data() {
        return {
            heroi: { vida: 100 },
            vilao: { vida: 100 },
            historico: [],
            vencedor: null,
            jogoFinalizado: false
        };
    },
    methods: {
        atacar(isHeroi) {
            const ataqueSom = new Audio('ataque.mp3');
            ataqueSom.play();

            if (this.jogoFinalizado) return; // Impede ações após o fim do jogo

            if (isHeroi) {
                this.historico.push("Herói atacou o Vilão");
                this.vilao.vida = Math.max(0, this.vilao.vida - 10); // Dano ao vilão
                this.animarPersonagem(this.$refs.heroiImg); // Anima o GIF do Herói
                if (!this.verificarVencedor()) {
                    setTimeout(() => this.acaoVilao(), 1000); // Vilão age após 1 segundo
                }
            } else {
                this.historico.push("Vilão atacou o Herói");
                this.heroi.vida = Math.max(0, this.heroi.vida - 10); // Dano ao herói
                this.animarPersonagem(this.$refs.vilaoImg); // Anima o GIF do Vilão
                this.verificarVencedor();
            }
            this.atualizarHistorico();
        },
        defender(isHeroi) {
            const defesaSom = new Audio('defesa.mp3');
            defesaSom.play();

            if (this.jogoFinalizado) return; // Impede ações após o fim do jogo

            if (isHeroi) {
                this.historico.push("Herói se defendeu");
                if (!this.verificarVencedor()) {
                    setTimeout(() => this.acaoVilao(), 1000);
                }
            } else {
                this.historico.push("Vilão se defendeu");
            }
            this.atualizarHistorico();
        },
        usarPocao(isHeroi) {
            const pocaoSom = new Audio('pocao.mp3');
            pocaoSom.play();

            if (this.jogoFinalizado) return; // Impede ações após o fim do jogo

            if (isHeroi) {
                this.historico.push("Herói usou uma poção");
                this.heroi.vida = Math.min(100, this.heroi.vida + 20); // Cura o herói
                if (!this.verificarVencedor()) {
                    setTimeout(() => this.acaoVilao(), 1000);
                }
            } else {
                this.historico.push("Vilão usou uma poção");
                this.vilao.vida = Math.min(100, this.vilao.vida + 20); // Cura o vilão
            }
            this.atualizarHistorico();
        },
        correr(isHeroi) {
            const correrSom = new Audio('correr.mp3');
            correrSom.play();

            if (this.jogoFinalizado) return; // Impede ações após o fim do jogo

            if (isHeroi) {
                this.historico.push("Herói tentou correr");
                if (!this.verificarVencedor()) {
                    setTimeout(() => this.acaoVilao(), 1000);
                }
            } else {
                this.historico.push("Vilão tentou correr");
            }
            this.atualizarHistorico();
        },
        acaoVilao() {
            const acoes = ['atacar', 'defender', 'usarPocao', 'correr'];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            this[acaoAleatoria](false); // O vilão age automaticamente
        },
        verificarVencedor() {
            if (this.heroi.vida === 0) {
                this.vencedor = "Vilão";
                this.jogoFinalizado = true;
                return true;
            } else if (this.vilao.vida === 0) {
                this.vencedor = "Herói";
                this.jogoFinalizado = true;
                return true;
            }
            return false;
        },
        animarPersonagem(imagem) {
            imagem.classList.add('atacando'); // Adiciona a classe de ataque à imagem
            setTimeout(() => {
                imagem.classList.remove('atacando'); // Remove a classe após 0.5s (tempo da animação)
            }, 500);
        },
        atualizarHistorico() {
            const historicoLista = document.getElementById('historico-lista');
            historicoLista.scrollTop = historicoLista.scrollHeight; // Rola para a parte inferior
        }
    }
}).mount("#app");
