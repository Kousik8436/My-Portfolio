import {
  FiBox,
  FiCode,
  FiCpu,
  FiActivity,
  FiLayers,
  FiTerminal,
} from "react-icons/fi";

const visuals: Record<
  number,
  { word: string; sub: string; className: string; icon: typeof FiCode }
> = {
  1: {
    word: "talent iq",
    sub: "CODE. PRACTICE. PROGRESS.",
    className: "art-talent",
    icon: FiCode,
  },
  2: {
    word: "movetto",
    sub: "LOGISTICS, CONNECTED.",
    className: "art-movetto",
    icon: FiBox,
  },
  3: {
    word: "a little better.",
    sub: "AI POWERED HABIT TRACKER",
    className: "art-habit",
    icon: FiActivity,
  },
  5: {
    word: "J.A.R.V.I.S",
    sub: "VOICE. INTELLIGENCE. AUTOMATION.",
    className: "art-jarvis",
    icon: FiCpu,
  },
};

export function ProjectArt({
  id,
  title,
  category,
}: {
  id: number;
  title: string;
  category: string;
}) {
  const visual = visuals[id];
  const Icon =
    visual?.icon ??
    (category === "GenAI"
      ? FiCpu
      : category === "Full Stack"
        ? FiLayers
        : FiTerminal);
  return (
    <div
      className={`project-art ${visual?.className ?? (category === "GenAI" ? "art-ai" : "art-default")}`}
      aria-hidden="true"
    >
      <span className="art-grid" />
      <span className="art-orbit orbit-one" />
      <span className="art-orbit orbit-two" />
      <div className="art-topline">
        <span>KOUSIK MAITY / PROJECT</span>
        <span>
          <span className="mini-square" /> {category.toUpperCase()}
        </span>
      </div>
      <div className="art-content">
        <span className="art-icon">
          <Icon />
        </span>
        <span className="art-word">{visual?.word ?? title}</span>
        <span className="art-sub">
          {visual?.sub ?? "BUILT WITH CURIOSITY & CODE"}
        </span>
      </div>
      <div className="art-bottomline">
        <span>DEVELOPMENT & ENGINEERING</span>
        <span>〈 / 〉</span>
      </div>
    </div>
  );
}
