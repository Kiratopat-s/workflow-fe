import { Quiz1 } from "@/components/quiz1";
import Quiz2 from "@/components/quiz2";
import Quiz3 from "@/components/quiz3";
import Quiz4 from "@/components/quiz4";

export default function Home() {
  let name: string = "Home";
  let age: number = 20;
  let isBoy: boolean = true;
  return (
    <main>
      <Quiz1 />
      <Quiz2 />
      <Quiz3 />
      <Quiz4 />
    </main>
  );
}
