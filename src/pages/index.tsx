import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "src/features/components/Button";
import Header from "src/features/components/Header";
import { Exercice, selectExercices } from "src/features/store/exercisesSlice";
import styles from "../styles/Home.module.css";

// interface ExerciceProps {
//   name: string;
//   description?: string;
// }

const Exercice: React.FC<Exercice> = ({ name, slug, description }) => {
  return (
    <Link href={`/exercice/${slug}`}>
      <a className="row">
        <div className="mb-2">
          <span className="title">{name}</span>
        </div>
        <p className="description">{description}</p>
      </a>
    </Link>
  );
};

const Home: NextPage = () => {
  const exercices = useSelector(selectExercices);

  useEffect(() => {
    console.log(exercices);
  }, [exercices]);

  return (
    <div className="container">
      <Head>
        <title>Trainer sheets</title>
        {/* <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Header>Accueil</Header>

      <Button href="exercice/add">Ajouter un exercice</Button>

      {exercices.map((exercice) => (
        <Exercice key={exercice.slug} {...exercice} />
      ))}
    </div>
  );
};

export default Home;