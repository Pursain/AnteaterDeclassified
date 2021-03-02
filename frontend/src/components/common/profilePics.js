import Badger from "../../assests/profile/Badger.png";
import Bear from "../../assests/profile/Bear.png";
import Beaver from "../../assests/profile/Beaver.png";
import Bull from "../../assests/profile/Bull.png";
import Cow from "../../assests/profile/Cow.png";
import Cat from "../../assests/profile/Cat.png";
import Deer from "../../assests/profile/Deer.png";
import Dog from "../../assests/profile/Dog.png";
import Giraffe from "../../assests/profile/Giraffe.png";
import Leopard from "../../assests/profile/Leopard.png";
import Lion from "../../assests/profile/Lion.png";
import Llama from "../../assests/profile/Llama.png";
import Octopus from "../../assests/profile/Octopus.png";
import Panda from "../../assests/profile/Panda.png";
import Wolf from "../../assests/profile/Wolf.png";

const array = [
  Badger,
  Bear,
  Beaver,
  Bull,
  Cow,
  Deer,
  Giraffe,
  Leopard,
  Lion,
  Llama,
  Octopus,
  Panda,
  Wolf,
];

export const getProfilePic = (index = null) => {
  if (index === null) {
    return array[Math.floor(Math.random() * array.length)];
  }
  return array[index % array.length];
};

export {
  Badger,
  Bear,
  Beaver,
  Bull,
  Cat,
  Cow,
  Deer,
  Dog,
  Giraffe,
  Leopard,
  Lion,
  Llama,
  Octopus,
  Panda,
  Wolf,
};
