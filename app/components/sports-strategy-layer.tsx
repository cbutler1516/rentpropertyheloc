export type SportsStrategyVariant =
  | "football-home"
  | "basketball-agents"
  | "football-buyers"
  | "multi-strategy"
  | "golf-commercial"
  | "tennis-about";

type SportsStrategyLayerProps = {
  variant: SportsStrategyVariant;
  className?: string;
};

const routeMarkerId = "strategyArrow";

export function SportsStrategyLayer({
  variant,
  className = "",
}: SportsStrategyLayerProps) {
  return (
    <div
      className={`sports-strategy-layer sports-strategy-${variant} ${className}`}
      aria-hidden
    >
      <div className="sports-strategy-mask" />
      <div className="sports-strategy-glow" />
      {renderStrategyBoard(variant)}
    </div>
  );
}

function renderStrategyBoard(variant: SportsStrategyVariant) {
  switch (variant) {
    case "basketball-agents":
      return <BasketballBoard />;
    case "football-buyers":
      return <BuyerFootballBoard />;
    case "multi-strategy":
      return <MultiSportBoard />;
    case "golf-commercial":
      return <GolfBoard />;
    case "tennis-about":
      return <TennisBoard />;
    case "football-home":
    default:
      return <FootballHomeBoard />;
  }
}

function SvgDefs() {
  return (
    <defs>
      <linearGradient id="strategyLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#6d28d9" stopOpacity="0.16" />
        <stop offset="48%" stopColor="#7c3aed" stopOpacity="0.86" />
        <stop offset="100%" stopColor="#ede9fe" stopOpacity="0.72" />
      </linearGradient>
      <marker
        id={routeMarkerId}
        markerWidth="9"
        markerHeight="9"
        refX="7"
        refY="4.5"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M 1.5 1.5 L 7 4.5 L 1.5 7.5" className="sports-arrowhead" />
      </marker>
    </defs>
  );
}

function FootballHomeBoard() {
  return (
    <div className="sports-board sports-board-football">
      <svg className="sports-svg" viewBox="0 0 1200 700" fill="none">
        <SvgDefs />
        <g className="sports-field sports-football-field">
          <rect x="540" y="96" width="610" height="500" rx="26" />
          {[590, 690, 790, 890, 990, 1090].map((x) => (
            <line key={x} x1={x} y1="118" x2={x} y2="574" />
          ))}
          <line x1="540" y1="346" x2="1150" y2="346" />
        </g>
        <g className="sports-hashes">
          {[
            590, 620, 650, 690, 720, 750, 790, 820, 850, 890, 920, 950, 990,
            1020, 1050, 1090,
          ].map((x) => (
            <g key={x}>
              <line x1={x} y1="274" x2={x} y2="292" />
              <line x1={x} y1="400" x2={x} y2="418" />
            </g>
          ))}
        </g>
        <g className="sports-field-numbers">
          <text x="626" y="146">10</text>
          <text x="726" y="146">20</text>
          <text x="826" y="146">30</text>
          <text x="926" y="146">40</text>
          <text x="1022" y="146">50</text>
        </g>
        <FootballRoutes />
      </svg>
      <FootballFormation />
    </div>
  );
}

function FootballRoutes() {
  return (
    <g className="sports-routes">
      <path
        className="sports-route sports-route-a"
        d="M 684 504 C 672 426 710 342 786 292 C 858 244 960 226 1058 238"
        markerEnd={`url(#${routeMarkerId})`}
      />
      <path
        className="sports-route sports-route-b"
        d="M 1056 504 C 1016 456 944 428 856 424 C 792 422 736 396 700 354"
        markerEnd={`url(#${routeMarkerId})`}
      />
      <path
        className="sports-route sports-route-c"
        d="M 1128 504 C 1102 426 1042 354 948 306 C 880 272 826 240 782 202"
        markerEnd={`url(#${routeMarkerId})`}
      />
      <path
        className="sports-route sports-route-d"
        d="M 828 462 C 758 474 724 444 734 404 C 750 348 824 326 902 338"
        markerEnd={`url(#${routeMarkerId})`}
      />
      <path
        className="sports-dotted-route sports-route-e"
        d="M 888 442 C 914 416 952 390 1008 366"
        markerEnd={`url(#${routeMarkerId})`}
      />
      <path
        className="sports-dotted-route sports-route-f"
        d="M 936 504 L 1012 454"
        markerEnd={`url(#${routeMarkerId})`}
      />
      <path
        className="sports-dotted-route sports-route-g"
        d="M 984 504 C 1036 478 1048 440 1016 416"
        markerEnd={`url(#${routeMarkerId})`}
      />
      <text className="sports-label sports-label-a" x="922" y="414">
        READ
      </text>
      <text className="sports-label sports-label-b" x="728" y="348">
        SHIFT
      </text>
      <text className="sports-label sports-label-c" x="1012" y="318">
        ROUTE
      </text>
    </g>
  );
}

function FootballFormation() {
  return (
    <div className="sports-markers">
      {["lg", "lt", "c", "rt", "rg", "qb", "rb", "wr-x", "slot", "wr-z"].map(
        (position) => (
          <span key={position} className={`sports-marker sports-o marker-${position}`}>
            O
          </span>
        ),
      )}
      {["de-l", "dt-l", "lb", "s", "cb", "de-r"].map((position) => (
        <span key={position} className={`sports-marker sports-x marker-${position}`}>
          X
        </span>
      ))}
    </div>
  );
}

function BasketballBoard() {
  return (
    <div className="sports-board sports-board-basketball">
      <svg className="sports-svg" viewBox="0 0 1200 700" fill="none">
        <SvgDefs />
        <g className="sports-field sports-court">
          <rect x="650" y="94" width="420" height="500" rx="18" />
          <line x1="650" y1="344" x2="1070" y2="344" />
          <path d="M 650 196 C 770 196 826 252 826 344 C 826 436 770 492 650 492" />
          <path d="M 650 256 C 718 256 750 292 750 344 C 750 396 718 432 650 432" />
          <circle cx="690" cy="344" r="16" />
        </g>
        <g className="sports-routes">
          <path className="sports-route sports-route-a" d="M 742 474 C 822 424 890 382 984 368" markerEnd={`url(#${routeMarkerId})`} />
          <path className="sports-route sports-route-b" d="M 972 474 C 914 430 848 404 770 396" markerEnd={`url(#${routeMarkerId})`} />
          <path className="sports-dotted-route sports-route-c" d="M 826 344 C 886 320 942 296 1016 248" markerEnd={`url(#${routeMarkerId})`} />
          <path className="sports-dotted-route sports-route-d" d="M 822 250 C 888 286 932 330 958 398" markerEnd={`url(#${routeMarkerId})`} />
          <text className="sports-label sports-label-a" x="850" y="316">PASS</text>
          <text className="sports-label sports-label-b" x="936" y="424">CUT</text>
        </g>
      </svg>
      <div className="sports-markers">
        {["b1", "b2", "b3", "b4", "b5"].map((position) => (
          <span key={position} className={`sports-marker sports-o marker-${position}`}>O</span>
        ))}
        {["bx1", "bx2", "bx3", "bx4"].map((position) => (
          <span key={position} className={`sports-marker sports-x marker-${position}`}>X</span>
        ))}
      </div>
    </div>
  );
}

function BuyerFootballBoard() {
  return (
    <div className="sports-board sports-board-buyer-football">
      <svg className="sports-svg" viewBox="0 0 1200 700" fill="none">
        <SvgDefs />
        <g className="sports-field sports-football-field">
          <rect x="600" y="130" width="470" height="420" rx="24" />
          {[680, 760, 840, 920, 1000].map((x) => (
            <line key={x} x1={x} y1="154" x2={x} y2="526" />
          ))}
        </g>
        <g className="sports-routes warm-routes">
          <path className="sports-route sports-route-a" d="M 708 470 C 706 392 746 320 812 270 C 864 230 934 216 1014 222" markerEnd={`url(#${routeMarkerId})`} />
          <path className="sports-route sports-route-b" d="M 862 470 C 910 420 958 386 1020 358" markerEnd={`url(#${routeMarkerId})`} />
          <path className="sports-dotted-route sports-route-c" d="M 786 440 C 820 406 862 382 918 366" markerEnd={`url(#${routeMarkerId})`} />
          <text className="sports-label sports-label-a" x="798" y="326">FIRST DRIVE</text>
        </g>
      </svg>
      <div className="sports-markers">
        {["bf1", "bf2", "bf3", "bf4", "bf5"].map((position) => (
          <span key={position} className={`sports-marker sports-o marker-${position}`}>O</span>
        ))}
      </div>
    </div>
  );
}

function MultiSportBoard() {
  return (
    <div className="sports-board sports-board-multi">
      <svg className="sports-svg" viewBox="0 0 1200 700" fill="none">
        <SvgDefs />
        <g className="sports-field sports-football-field multi-layer-football">
          <rect x="600" y="118" width="470" height="420" rx="24" />
          {[680, 760, 840, 920, 1000].map((x) => (
            <line key={x} x1={x} y1="142" x2={x} y2="514" />
          ))}
        </g>
        <g className="sports-field sports-court multi-layer-basketball">
          <rect x="690" y="170" width="270" height="300" rx="18" />
          <path d="M 690 250 C 780 250 820 280 820 320 C 820 360 780 390 690 390" />
        </g>
        <g className="sports-field sports-tennis-court multi-layer-tennis">
          <rect x="760" y="230" width="280" height="240" rx="10" />
          <line x1="900" y1="230" x2="900" y2="470" />
          <line x1="760" y1="350" x2="1040" y2="350" />
        </g>
        <g className="sports-routes">
          <path className="sports-route sports-route-a" d="M 660 486 C 718 392 792 318 902 262" markerEnd={`url(#${routeMarkerId})`} />
          <path className="sports-route sports-route-b" d="M 1040 480 C 978 408 910 360 804 336" markerEnd={`url(#${routeMarkerId})`} />
          <path className="sports-dotted-route sports-route-c" d="M 776 430 C 848 402 912 374 982 320" markerEnd={`url(#${routeMarkerId})`} />
          <text className="sports-label sports-label-a" x="806" y="300">SCOUT</text>
          <text className="sports-label sports-label-b" x="932" y="404">PLAN</text>
        </g>
      </svg>
    </div>
  );
}

function GolfBoard() {
  return (
    <div className="sports-board sports-board-golf">
      <svg className="sports-svg" viewBox="0 0 1200 700" fill="none">
        <SvgDefs />
        <g className="sports-field sports-golf-course">
          <path d="M 660 560 C 724 468 714 366 792 286 C 858 218 944 180 1030 136" />
          <path d="M 742 560 C 806 470 806 386 870 314 C 924 254 984 220 1082 178" />
          <ellipse cx="920" cy="312" rx="106" ry="62" />
          <ellipse cx="1010" cy="194" rx="58" ry="34" />
          <path d="M 828 420 C 872 390 910 386 956 402" />
        </g>
        <g className="sports-risk-zones">
          <ellipse cx="794" cy="438" rx="58" ry="34" />
          <ellipse cx="982" cy="292" rx="46" ry="28" />
        </g>
        <g className="sports-routes">
          <path className="sports-route sports-route-a" d="M 690 548 C 746 462 808 390 894 326" markerEnd={`url(#${routeMarkerId})`} />
          <path className="sports-dotted-route sports-route-b" d="M 894 326 C 938 276 984 236 1036 196" markerEnd={`url(#${routeMarkerId})`} />
          <path className="sports-dotted-route sports-route-c" d="M 792 438 C 854 418 912 394 964 354" markerEnd={`url(#${routeMarkerId})`} />
          <text className="sports-label sports-label-a" x="824" y="378">TARGET</text>
          <text className="sports-label sports-label-b" x="930" y="260">RISK</text>
        </g>
      </svg>
    </div>
  );
}

function TennisBoard() {
  return (
    <div className="sports-board sports-board-tennis">
      <svg className="sports-svg" viewBox="0 0 1200 700" fill="none">
        <SvgDefs />
        <g className="sports-field sports-tennis-court">
          <rect x="670" y="118" width="410" height="470" rx="12" />
          <line x1="875" y1="118" x2="875" y2="588" />
          <line x1="670" y1="352" x2="1080" y2="352" />
          <line x1="760" y1="118" x2="760" y2="588" />
          <line x1="990" y1="118" x2="990" y2="588" />
          <line x1="760" y1="250" x2="990" y2="250" />
          <line x1="760" y1="454" x2="990" y2="454" />
        </g>
        <g className="sports-routes">
          <path className="sports-route sports-route-a" d="M 724 506 C 818 430 926 320 1030 184" markerEnd={`url(#${routeMarkerId})`} />
          <path className="sports-route sports-route-b" d="M 1032 512 C 940 430 840 332 722 206" markerEnd={`url(#${routeMarkerId})`} />
          <path className="sports-dotted-route sports-route-c" d="M 820 512 C 852 472 876 420 888 356" markerEnd={`url(#${routeMarkerId})`} />
          <text className="sports-label sports-label-a" x="790" y="404">ANGLE</text>
          <text className="sports-label sports-label-b" x="924" y="256">BASELINE</text>
        </g>
      </svg>
    </div>
  );
}
