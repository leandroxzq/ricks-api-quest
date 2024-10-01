const find = document.querySelector(".main__find");

const container = document.querySelector(".character-wrapper");

let num = 1;
let currentSearchTerm = "";

find.addEventListener("input", () => {
	currentSearchTerm = find.value.trim();

	num = 1;

	const inputUserName = `https://rickandmortyapi.com/api/character/?page=${num}&name=${currentSearchTerm}`;

	loadCharacter(inputUserName);
});

const loadCharacter = async (urlCharacter) => {
	const req = await fetch(urlCharacter);
	const json = await req.json();

	container.innerHTML = "";

	json.results.forEach((personagem) => {
		const img = document.createElement("img");
		const page = document.querySelector(".page");

		img.classList.add("character-wrapper__img");
		container.appendChild(img);

		page.innerHTML = num;
		img.src = personagem.image;

		img.addEventListener("click", (e) => {
			const main = document.querySelector(".main");
			const background = document.querySelector(".background");
			const detailsWrapper = document.querySelector(".details-wrapper");
			const detailsImg = document.querySelector(".details-wrapper__img");
			const detailsClose = document.querySelector(".details-wrapper__close");

			const detailsName = document.querySelector(".section-info__name");
			const detailsStatus = document.querySelector(".infoName");
			const detailsSex = document.querySelector(".section-info__sex");
			const detailsEp = document.querySelector(".section-info__ep");

			background.classList.remove("desactive");
			detailsWrapper.classList.remove("desactive");
			detailsWrapper.classList.add("active");

			main.style.filter = "blur(4px)";

			detailsImg.src = personagem.image;
			detailsName.textContent = personagem.name;
			detailsStatus.textContent = `${translateText(personagem.status)} - ${translateText(personagem.species)}`;
			detailsSex.textContent = `Gênero: ${translateText(personagem.gender)}`;
			detailsEp.textContent = `Participou de ${personagem.episode.length} episódios`;

			const statusBefore = document.querySelector(".statusBall");

			personagem.status === "Alive"
				? (statusBefore.style.background = "green")
				: (statusBefore.style.background = "red");

			detailsClose.addEventListener("click", (e) => {
				if (e.target) {
					main.style.filter = "blur(0px)";
					background.classList.add("desactive");
					detailsWrapper.classList.remove("active");
					detailsWrapper.classList.add("desactive");
				}
			});
		});
	});
};

const loadCurrentCharacter = () => {
	const urlCharacter = currentSearchTerm
		? `https://rickandmortyapi.com/api/character/?page=${num}&name=${currentSearchTerm}`
		: `https://rickandmortyapi.com/api/character/?page=${num}`;
	loadCharacter(urlCharacter);
};

window.addEventListener("load", loadCurrentCharacter);

const btnNext = document.getElementById("btnNext");
const btnPrevious = document.getElementById("btnPrevious");

btnNext.addEventListener("click", () => {
	if (num <= 41) {
		num++;
	}
	loadCurrentCharacter();
});

btnPrevious.addEventListener("click", () => {
	if (num > 1) {
		num--;
		loadCurrentCharacter();
	}
});

const translateText = (text) => {
	const translateMap = {
		Alive: "Vivo",
		Dead: "Morto",
		unknown: "Desconhecido",
		Female: "Feminino",
		Male: "Masculino",
		Human: "Humano",
	};

	return translateMap[text];
};
