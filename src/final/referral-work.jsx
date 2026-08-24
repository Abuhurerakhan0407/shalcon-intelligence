import { motion } from "framer-motion";
import { PROJECTS } from "./data.js";
import { Reveal } from "./ui.jsx";

function WorkGlyph({ kind }) {
  if (kind === "network") return <div className="work-glyph network"><i/><i/><i/><i/><b/></div>;
  if (kind === "dashboard") return <div className="work-glyph dashboard"><i/><i/><i/><b/><b/><b/></div>;
  if (kind === "layers") return <div className="work-glyph layers"><i/><i/><i/></div>;
  return <div className="work-glyph matrix">{Array.from({ length: 9 }).map((_, i) => <i key={i}/>)}</div>;
}

export function ReferralWork() {
  return (
    <section className="section-shell section-pad referral-work" id="projects">
      <Reveal className="section-heading referral-heading">
        <div><span className="eyebrow"><span>03</span> SELECTED WORK</span><h2>Where interface, software and automation meet.</h2></div>
        <p>Products I’m actively designing, building or architecting — showing both the experience people use and the systems working behind it.</p>
      </Reveal>
      <div className="referral-work-grid">
        {PROJECTS.map((project, i) => (
          <motion.article
            className="referral-work-card"
            key={project.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: .18 }}
            transition={{ duration: .58, delay: i * .045, ease: [.22,1,.36,1] }}
            whileHover={{ y: -4 }}
            data-cursor="WORK"
          >
            <div className="referral-work-top"><span>{project.index}</span><b>{project.stage}</b></div>
            <WorkGlyph kind={project.kind}/>
            <div className="referral-work-copy"><small>{project.category}</small><h3>{project.title}</h3><p>{project.statement}</p></div>
            <div className="referral-work-tags">{project.stack.slice(0,4).map((tag) => <span key={tag}>{tag}</span>)}</div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
