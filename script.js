const find = document.querySelector(".main__find").value.trim();

const container = document.querySelector(".character-wrapper");

let num = 1;

const loadCharacter = async (urlCharacter) => {
	const req = await fetch(urlCharacter);
	const json = await req.json();

	console.log(json.results[0]);

	container.innerHTML = "";

	json.results.forEach((personagem) => {
		const img = document.createElement("img");
		const page = document.querySelector(".page");

		img.classList.add("character-wrapper__img");
		container.appendChild(img);

		page.innerHTML = num;
		img.src = personagem.image;

		img.addEventListener("click", (e) => {
			const detailsWrapper = document.querySelector(".details-wrapper");
			const detailsImg = document.querySelector(".details-wrapper__img");
			const detailsClose = document.querySelector(".details-wrapper__close");

			const detailsName = document.querySelector(".section-info__name");
			const detailsStatus = document.querySelector(".infoName");
			const detailsSex = document.querySelector(".section-info__sex");

			detailsWrapper.classList.remove("desactive");
			detailsWrapper.classList.add("active");

			detailsImg.src = personagem.image;
			detailsName.textContent = personagem.name;
			detailsStatus.textContent = `${personagem.status}-${personagem.species}`;
			detailsSex.textContent = `Gênero: ${personagem.gender}`;

			const statusBefore = document.querySelector(".statusBall");

			personagem.status === "Alive"
				? (statusBefore.style.background = "green")
				: (statusBefore.style.background = "red");

			detailsClose.addEventListener("click", (e) => {
				if (e.target) {
					detailsWrapper.classList.remove("active");
					detailsWrapper.classList.add("desactive");
				}
			});
		});
	});
};

const loadCurrentCharacter = () => {
	const page = `?page=${num}`;
	const urlCharacter = `https://rickandmortyapi.com/api/character${page}`;
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
