import HeroSection from "../../components/HeroSection/HeroSection";
import InfoSection from "../../components/InfoSection/InfoSection";

const coursesData = [
  {
    title: "Example 1",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, nisi voluptate neque, soluta facilis autem sint asperiores, voluptatum at sit ipsa. Alias porro mollitia, laudantium repudiandae non fugiat voluptatibus veritatis?",
    link: "https://www.youtube.com/@marcosrodriguespro",
  },
  {
    title: "Example 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, nisi voluptate neque, soluta facilis autem sint asperiores, voluptatum at sit ipsa. Alias porro mollitia, laudantium repudiandae non fugiat voluptatibus veritatis?",
    link: "https://www.youtube.com/@marcosrodriguespro",
  },
  {
    title: "Example 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, nisi voluptate neque, soluta facilis autem sint asperiores, voluptatum at sit ipsa. Alias porro mollitia, laudantium repudiandae non fugiat voluptatibus veritatis?",
    link: "https://www.youtube.com/@marcosrodriguespro",
  },
];

export default function Page() {
  return (
    <div>
      <main>
        <HeroSection heading="Courses" imageName="courses.jpg"/>
        <InfoSection highlights={coursesData}/>
      </main>
    </div>
  );
}
