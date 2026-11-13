import Link from "next/link";
export function PageHero({eyebrow,title,desc}:{eyebrow:string,title:string,desc:string}){return <section className="pagehero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>{eyebrow}</span></div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{desc}</p></div></section>}
