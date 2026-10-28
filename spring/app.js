const ASSET_ROOT = "./素材/";
const SCENE_WIDTH = 1440;
const SCENE_HEIGHT = 900;

const scenes = {
  hero: document.querySelector("#hero-scene"),
  roof: document.querySelector("#roof-scene"),
  people: document.querySelector("#people-scene"),
  bridge: document.querySelector("#bridge-scene"),
  leafField: document.querySelector("#leaf-field"),
  stone: document.querySelector("#stone-scene"),
  tree: document.querySelector("#tree-scene"),
  recall: document.querySelector("#recall-map")
};

const chapters = {
  hero: document.querySelector('[data-chapter="hero-house"]'),
  horizontal: document.querySelector('[data-chapter="roof-people-bridge"]'),
  stones: document.querySelector('[data-chapter="stones"]'),
  trees: document.querySelector('[data-chapter="trees"]'),
  recall: document.querySelector('[data-chapter="recall"]')
};

const horizontalTrack = document.querySelector("#roof-people-track");
const hoverCard = document.querySelector("#hover-card");
const hoverCardImage = document.querySelector("#hover-card-image");
const detailDialog = document.querySelector("#detail-dialog");
const detailImage = document.querySelector("#detail-image");
const dialogClose = document.querySelector(".dialog-close");
const languageToggle = document.querySelector("#language-toggle");
const backToDirectory = document.querySelector(".back-to-directory");

let currentLanguage = "en";

function assetUrl(name) {
  return encodeURI(ASSET_ROOT + name);
}

function addImage(parent, options) {
  const image = document.createElement("img");
  image.src = assetUrl(options.name);
  image.alt = options.alt || "";
  image.className = ("layer " + (options.className || "")).trim();
  Object.assign(image.style, {
    left: options.x + "px",
    top: options.y + "px",
    width: options.width + "px",
    height: options.height + "px"
  });
  Object.entries(options.data || {}).forEach(function(entry) {
    image.dataset[entry[0]] = entry[1];
  });
  parent.append(image);
  return image;
}

function addCopy(parent, options) {
  const copy = document.createElement("p");
  copy.className = ("copy " + (options.className || "")).trim();
  copy.dataset.en = options.en || options.html || "";
  copy.dataset.zh = options.zh || options.en || options.html || "";
  copy.innerHTML = copy.dataset.en;
  Object.assign(copy.style, {
    left: options.x + "px",
    top: options.y + "px",
    width: options.width + "px"
  });
  parent.append(copy);
  return copy;
}

function addRecallHotspot(parent, options) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "recall-hotspot " + (options.className || "") + (options.style === "ring" ? " recall-style-ring" : " recall-style-solid");
  button.dataset.recallNumber = String(options.number);
  button.dataset.direction = options.direction;
  Object.assign(button.style, {
    left: options.x + (options.unit || "px"),
    top: options.y + (options.unit || "px")
  });
  parent.append(button);
  return button;
}

function addLine(parent, options) {
  const line = document.createElement("span");
  line.className = "ink-line";
  Object.assign(line.style, {
    left: options.x + "px",
    top: options.y + "px",
    width: options.width + "px",
    transform: "rotate(" + options.angle + "deg)"
  });
  parent.append(line);
  return line;
}

function addHotspot(parent, options) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "hotspot " + (options.className || "");
  button.setAttribute("aria-label", options.label || "查看详情");
  if (options.card) button.dataset.card = options.card;
  Object.assign(button.style, {
    left: options.x + "px",
    top: options.y + "px"
  });
  parent.append(button);
  return button;
}

const heroHouse = addImage(scenes.hero, {
  name: "顶部房屋及后方景物.png",
  x: 0,
  y: 44,
  width: 1440,
  height: 811,
  className: "hero-house",
  alt: "春景庭院"
});

const heroLeafLayout = [
  [-310, -300, 850, -560, -430, -8],
  [-250, -100, 790, -620, -70, -5],
  [930, -290, 830, 570, -420, 8],
  [950, -40, 800, 620, -30, 7],
  [-330, 330, 800, -620, 280, -9],
  [960, 330, 780, 630, 300, 9],
  [180, -400, 760, -100, -570, -4],
  [620, -380, 760, 120, -560, 4]
];

const heroLeaves = heroLeafLayout.map(function(values, index) {
  return addImage(scenes.hero, {
    name: "顶部前景树叶拆分 (" + (index + 1) + ").png",
    x: values[0],
    y: values[1],
    width: values[2],
    height: values[2],
    className: "split-leaf",
    data: {
      dx: values[3],
      dy: values[4],
      rotation: values[5],
      order: index
    }
  });
});

const houseCopy = addCopy(scenes.hero, {
  x: 62,
  y: 315,
  width: 425,
  en: "Using <strong>jiehua</strong>, a traditional ruled-line painting technique, the artist precisely renders rooftops, lattice windows, and timber structures. The corner-focused composition balances intricate architecture with open natural space, reflecting the harmonious relationship between human dwellings and the surrounding landscape.",
  zh: "<strong>界画</strong>是一种以界尺引线的传统绘画技法。画家借此精确刻画屋顶、格扇门窗与木构架。偏置一隅的构图使繁密建筑与疏朗自然相互平衡，呈现人居与山林之间和谐共生的关系。"
});

const roofCopy = addCopy(scenes.roof, {
  x: 62,
  y: 330,
  width: 450,
  en: "Based on <strong>Liu Songnian's Four Seasons Landscapes</strong>, this exploded view reveals the structural features and craftsmanship of Song dynasty architecture through its individual components.",
  zh: "本页取材自<strong>刘松年《四景山水图》</strong>，以构件拆解的方式展示宋代建筑的结构特征与营造工艺。"
});

const roofParts = [
  ["鸱尾", "屋顶拆解零件_鸱尾.png", "屋顶拆解零件介绍卡_鸱尾.png", 836, 194, 173, 106],
  ["斜脊", "屋顶拆解零件_斜脊.png", "屋顶拆解零件介绍卡_斜脊.png", 1012, 256, 292, 165],
  ["吻兽", "屋顶拆解零件_吻兽.png", "屋顶拆解零件介绍卡_吻兽.png", 1267, 320, 74, 78],
  ["戗脊", "屋顶拆解零件_戗脊.png", "屋顶拆解零件介绍卡_戗脊.png", 1302, 396, 78, 50],
  ["博风板", "屋顶拆解零件_博风板.png", "屋顶拆解零件介绍卡_博风板.png", 631, 264, 216, 162],
  ["蜀柱", "屋顶拆解零件_蜀柱.png", "屋顶拆解零件介绍卡_蜀柱.png", 704, 411, 53, 72],
  ["惹草", "屋顶拆解零件_惹草.png", "屋顶拆解零件介绍卡_惹草.png", 1016, 427, 60, 40],
  ["平梁", "屋顶拆解零件_平梁.png", "屋顶拆解零件介绍卡_平梁.png", 731, 368, 178, 59],
  ["槅扇门", "屋顶拆解零件_格子门窗.png", "屋顶拆解零件介绍卡_槅扇门（格子门窗）.png", 769, 443, 262, 131],
  ["斗拱", "屋顶拆解零件_斗拱.png", "屋顶拆解零件介绍卡_斗拱.png", 1248, 645, 97, 73],
  ["台基", "屋顶拆解零件_台基.png", "屋顶拆解零件介绍卡_台基.png", 799, 529, 455, 152]
];

const roofPartElements = roofParts.map(function(part, index) {
  return addImage(scenes.roof, {
    name: part[1],
    x: part[3],
    y: part[4],
    width: part[5],
    height: part[6],
    className: "roof-part",
    alt: part[0],
    data: { index: index }
  });
});

const hotspotPositions = [
  [912, 212],
  [999, 420],
  [1274, 301],
  [1352, 389],
  [687, 436],
  [825, 356],
  [1098, 295],
  [676, 340],
  [758, 609],
  [912, 451],
  [1236, 653]
];

const hotspotAssignments = [
  { number: 2, name: "鸱尾", card: "屋顶拆解零件介绍卡_鸱尾.png" },
  { number: 11, name: "惹草", card: "屋顶拆解零件介绍卡_惹草.png" },
  { number: 4, name: "吻兽", card: "屋顶拆解零件介绍卡_吻兽.png" },
  { number: 5, name: "戗脊", card: "屋顶拆解零件介绍卡_戗脊.png" },
  { number: 8, name: "蜀柱", card: "屋顶拆解零件介绍卡_蜀柱.png" },
  { number: 9, name: "平梁", card: "屋顶拆解零件介绍卡_平梁.png" },
  { number: 3, name: "斜脊", card: "屋顶拆解零件介绍卡_斜脊.png" },
  { number: 1, name: "博风板", card: "屋顶拆解零件介绍卡_博风板.png" },
  { number: 7, name: "台基", card: "屋顶拆解零件介绍卡_台基.png" },
  { number: 10, name: "格子门窗", card: "屋顶拆解零件介绍卡_槅扇门（格子门窗）.png" },
  { number: 6, name: "斗拱", card: "屋顶拆解零件介绍卡_斗拱.png" }
];

const roofHotspots = hotspotPositions.map(function(position, index) {
  const assignment = hotspotAssignments[index];
  return addHotspot(scenes.roof, {
    x: position[0],
    y: position[1],
    label: "查看" + assignment.name + "介绍",
    card: assignment.card,
    className: "roof-hotspot-" + assignment.number
  });
});

const people = [
  ["人物1.png", 59, 425, 215, 322],
  ["人物4.png", 820, 383, 212, 366],
  ["人物2+3.png", 427, 162, 408, 385]
].map(function(item) {
  return addImage(scenes.people, {
    name: item[0],
    x: item[1],
    y: item[2],
    width: item[3],
    height: item[4],
    className: "person"
  });
});

const peopleCopies = [
  ["Beneath a parasol tree at the entrance to the courtyard, a young servant tidies up the carrying equipment, assisted by another attendant.", "庭院入口的梧桐树下，一名年轻侍从正在整理挑担，由另一名随从从旁协助。", 50, 159, 369],
  ["A figure leans beside a small bridge, gazing into the distance, seemingly awaiting the return of the master of the household.", "一人倚在小桥边眺望远方，仿佛正等待宅院主人归来。", 352, 579, 430],
  ["A figure, seemingly a slender woman with a high bun, rests in an open pavilion, wearing a dark blue short jacket. Seen from behind, the garment's details remain indistinct.", "一位身形纤细、梳高髻的女子倚坐敞亭，身穿深蓝短褙子。因其背向观者，衣饰细节难以辨明。", 1040, 209, 340]
].map(function(item) {
  return addCopy(scenes.people, {
    en: item[0],
    zh: item[1],
    x: item[2],
    y: item[3],
    width: item[4],
    className: "people-copy"
  });
});

const peopleLines = [
  [385, 355, 125, 31],
  [238, 578, 79, 8],
  [1010, 576, 167, -36]
].map(function(item) {
  return addLine(scenes.people, {
    x: item[0],
    y: item[1],
    width: item[2],
    angle: item[3]
  });
});

const bridgeParts = [
  ["桥梁主体.png", 58, 350, 524, 260],
  ["桥梁分离构件1.png", 660, 285, 218, 195],
  ["桥梁分离构件2.png", 770, 532, 12, 94]
].map(function(item) {
  return addImage(scenes.bridge, {
    name: item[0],
    x: item[1],
    y: item[2],
    width: item[3],
    height: item[4],
    className: "bridge-part"
  });
});

const bridgeCopy = addCopy(scenes.bridge, {
  x: 905,
  y: 360,
  width: 455,
  en: "A small bridge spans a stream outside the courtyard gate. Built using the <strong>tailiang</strong> (raised-beam) method, it features wooden posts and beams. Its simplified railings retain the essential features of Song dynasty bridge architecture.",
  zh: "一座小桥横跨院门外的溪流。桥体采用<strong>抬梁式</strong>结构，以木柱与梁架承托。简洁的栏杆仍保留宋代桥梁建筑的基本特征。"
});

const bridgeLines = [
  addLine(scenes.bridge, { x: 550, y: 380, width: 135, angle: -8.5 }),
  addLine(scenes.bridge, { x: 461, y: 571, width: 297, angle: 2 })
];

const bridgeHotspots = [
  addHotspot(scenes.bridge, {
    x: 743,
    y: 322,
    label: "查看石桥结构介绍",
    className: "bridge-hotspot",
    card: "屋顶拆解零件介绍卡_石桥结构.png"
  }),
  addHotspot(scenes.bridge, {
    x: 782,
    y: 518,
    label: "查看通天柱介绍",
    className: "bridge-hotspot",
    card: "屋顶拆解零件介绍卡_通天柱.png"
  })
];

const fallingLeaves = Array.from({ length: 72 }, function(_, index) {
  const lane = index % 9;
  const row = Math.floor(index / 9);
  const size = 96 + (index % 7) * 17;
  return addImage(scenes.leafField, {
    name: "转场落叶 (" + ((index % 5) + 1) + ").png",
    x: 240 + lane * 165 + (row % 2) * 70,
    y: -300 - row * 75 - (lane % 3) * 38,
    width: size,
    height: size,
    className: "falling-leaf",
    data: { index: index, lane: lane, row: row }
  });
});

const stoneData = [
  ["石头1.png", 277, 215, 2.78],
  ["石头2.png", 331, 199, 3.72],
  ["石头3.png", 351, 117, 4.92],
  ["石头4.png", 315, 161, 6.02]
];

const stones = stoneData.map(function(item, index) {
  return addImage(scenes.stone, {
    name: item[0],
    x: 0,
    y: 0,
    width: item[1],
    height: item[2],
    className: "stone",
    data: {
      width: item[1],
      height: item[2],
      displayAngle: item[3],
      index: index
    }
  });
});

const stoneCopy = addCopy(scenes.stone, {
  x: 382,
  y: 510,
  width: 680,
  en: "<strong>Liu Songnian</strong> developed the guatiecun technique from axe-cut texture strokes. Using dark, moist ink and angled brushwork with dry-brush finishes, he depicted rocks with sharp, angular forms, resembling the forceful scraping of iron.",
  zh: "<strong>刘松年</strong>在斧劈皴基础上发展出刮铁皴。他以浓湿墨配合侧锋运笔，并以枯笔收束，使石体棱角分明，仿佛铁器刮擦而成。"
});

const trees = [
  addImage(scenes.tree, {
    name: "树木1.png",
    x: 650,
    y: 235,
    width: 430,
    height: 286,
    className: "tree tree-one"
  }),
  addImage(scenes.tree, {
    name: "树木2.png",
    x: 930,
    y: 550,
    width: 408,
    height: 204,
    className: "tree tree-two"
  })
];

const treeCopy = addCopy(scenes.tree, {
  x: 82,
  y: 515,
  width: 510,
  en: "The foreground trees are outlined in dark ink, followed by upward texture strokes. Soft, natural contours and varied ink tones vividly capture the rounded forms and rugged textures of the trunks.",
  zh: "前景树木先以浓墨勾勒轮廓，再施向上的纹理笔触。柔和自然的外形与层次丰富的墨色，生动表现出树干浑圆而粗粝的质感。"
});

const recallLabels = {
  1: { en: "courtyard panorama", zh: "庭院全景" },
  2: { en: "architectural view", zh: "建筑全景" },
  3: { en: "attendants beneath the parasol tree", zh: "梧桐下的侍从" },
  4: { en: "figure in the pavilion", zh: "亭中人物" },
  5: { en: "figure beside the bridge", zh: "桥畔人物" },
  6: { en: "stone bridge", zh: "石桥" },
  7: { en: "rock study I", zh: "山石一" },
  8: { en: "rock study II", zh: "山石二" },
  9: { en: "rock study III", zh: "山石三" },
  10: { en: "rock study IV", zh: "山石四" },
  11: { en: "tree study I", zh: "树木一" },
  12: { en: "tree study II", zh: "树木二" }
};

const contentRecallDefinitions = [
  { number: 1, parent: scenes.hero, x: 92.1, y: 68, group: "hero", style: "ring" },
  { number: 2, parent: scenes.roof, x: 46.03, y: 64.86, group: "roof", style: "ring" },
  { number: 3, parent: scenes.people, x: 39.83, y: 26.07, group: "people", style: "solid" },
  { number: 4, parent: scenes.people, x: 66.79, y: 36.62, group: "people", style: "solid" },
  { number: 5, parent: scenes.people, x: 13.93, y: 47.85, group: "people", style: "solid" },
  { number: 6, parent: scenes.bridge, x: 13.4, y: 41, group: "bridge", style: "ring" },
  { number: 7, parent: scenes.stone, x: 8.35, y: 48.60, group: "stones", style: "solid" },
  { number: 8, parent: scenes.stone, x: 30.00, y: 20.67, group: "stones", style: "solid" },
  { number: 9, parent: scenes.stone, x: 71.28, y: 24.86, group: "stones", style: "solid" },
  { number: 10, parent: scenes.stone, x: 92.18, y: 50.70, group: "stones", style: "solid" },
  { number: 11, parent: scenes.tree, x: 68.38, y: 15.19, group: "trees", style: "solid" },
  { number: 12, parent: scenes.tree, x: 90.42, y: 55.09, group: "trees", style: "solid" }
];

const contentRecallHotspots = contentRecallDefinitions.map(function(definition) {
  const hotspot = addRecallHotspot(definition.parent, {
    number: definition.number,
    direction: "to-panorama",
    x: definition.x,
    y: definition.y,
    unit: "%",
    style: definition.style,
    className: "scene-recall-hotspot recall-group-" + definition.group
  });
  hotspot.dataset.group = definition.group;
  return hotspot;
});

const panoramaRecallPositions = [
  [1, 85.55, 24.47, "ring"],
  [2, 96.14, 43.70, "ring"],
  [3, 75.49, 56.93, "solid"],
  [4, 81.24, 58.18, "solid"],
  [5, 70.57, 64.79, "solid"],
  [6, 61.65, 67.79, "ring"],
  [7, 85.3, 8.9],
  [8, 90.77, 67.92, "solid"],
  [9, 62.63, 82.90, "solid"],
  [10, 43.72, 90.64, "solid"],
  [11, 22.16, 75.28, "solid"],
  [12, 70.05, 54.81, "solid"]
];

const panoramaRecallHotspots = panoramaRecallPositions.map(function(position) {
  return addRecallHotspot(scenes.recall, {
    number: position[0],
    direction: "to-content",
    x: position[1],
    y: position[2],
    unit: "%",
    style: position[3] || "solid",
    className: "panorama-recall-hotspot"
  });
});

const recallDestinations = {
  1: { chapter: chapters.hero, progress: 0.66 },
  2: { chapter: chapters.horizontal, progress: 0.2 },
  3: { chapter: chapters.horizontal, progress: 0.57 },
  4: { chapter: chapters.horizontal, progress: 0.57 },
  5: { chapter: chapters.horizontal, progress: 0.57 },
  6: { chapter: chapters.horizontal, progress: 0.96 },
  7: { chapter: chapters.stones, progress: 0.42 },
  8: { chapter: chapters.stones, progress: 0.42 },
  9: { chapter: chapters.stones, progress: 0.42 },
  10: { chapter: chapters.stones, progress: 0.42 },
  11: { chapter: chapters.trees, progress: 0.38 },
  12: { chapter: chapters.trees, progress: 0.38 }
};

function setRecallVisibility(group, visibility) {
  contentRecallHotspots.forEach(function(hotspot) {
    if (hotspot.dataset.group !== group) return;
    hotspot.style.opacity = visibility;
    hotspot.style.pointerEvents = visibility > 0.92 ? "auto" : "none";
    hotspot.style.transform = "translate(-50%, -50%) scale(" + mix(0.58, 1, visibility) + ")";
  });
}

function highlightRecallPoint(number, direction) {
  const selector = '.recall-hotspot[data-recall-number="' + number + '"][data-direction="' + direction + '"]';
  const hotspot = document.querySelector(selector);
  if (!hotspot) return;
  hotspot.classList.remove("is-arrival");
  void hotspot.offsetWidth;
  hotspot.classList.add("is-arrival");
  window.setTimeout(function() {
    hotspot.classList.remove("is-arrival");
  }, direction === "to-content" ? 3200 : 1200);
}

function jumpToPanorama(number) {
  chapters.recall.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(function() {
    highlightRecallPoint(number, "to-content");
  }, 780);
}

function jumpToContent(number) {
  const destination = recallDestinations[number];
  if (!destination) return;
  const travel = Math.max(0, destination.chapter.offsetHeight - window.innerHeight);
  const targetY = destination.chapter.offsetTop + travel * destination.progress;
  window.scrollTo({ top: targetY, behavior: "smooth" });
  window.setTimeout(function() {
    highlightRecallPoint(number, "to-panorama");
  }, 920);
}

function applyLanguage(language) {
  currentLanguage = language === "zh" ? "zh" : "en";
  document.body.dataset.language = currentLanguage;
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  document.querySelectorAll(".copy[data-en]").forEach(function(copy) {
    copy.innerHTML = copy.dataset[currentLanguage];
  });
  languageToggle.setAttribute("aria-pressed", currentLanguage === "zh" ? "true" : "false");
  languageToggle.setAttribute("aria-label", currentLanguage === "zh" ? "Switch to English" : "切换为中文");
  backToDirectory.setAttribute("aria-label", currentLanguage === "zh" ? "返回目录页" : "Back to the directory");
  dialogClose.setAttribute("aria-label", currentLanguage === "zh" ? "关闭" : "Close");
  contentRecallHotspots.concat(panoramaRecallHotspots).forEach(function(hotspot) {
    const number = Number(hotspot.dataset.recallNumber);
    const label = recallLabels[number][currentLanguage];
    const toPanorama = hotspot.dataset.direction === "to-panorama";
    const action = currentLanguage === "zh"
      ? (toPanorama ? "在全景图中查看：" : "返回介绍：")
      : (toPanorama ? "View in the panorama: " : "Return to the introduction: ");
    const text = action + label;
    hotspot.setAttribute("aria-label", text);
    hotspot.title = text;
  });
  try {
    window.localStorage.setItem("spring-language", currentLanguage);
  } catch (error) {
    // File previews can disable storage; the switch still works for this visit.
  }
}

languageToggle.addEventListener("click", function() {
  applyLanguage(currentLanguage === "en" ? "zh" : "en");
});

document.addEventListener("click", function(event) {
  const hotspot = event.target.closest(".recall-hotspot");
  if (!hotspot) return;
  const number = Number(hotspot.dataset.recallNumber);
  if (hotspot.dataset.direction === "to-panorama") {
    jumpToPanorama(number);
  } else {
    jumpToContent(number);
  }
});

function positionHoverCard(event) {
  const rect = hoverCard.getBoundingClientRect();
  const gap = 18;
  let x = event.clientX + gap;
  let y = event.clientY + gap;
  if (x + rect.width > window.innerWidth - 12) x = event.clientX - rect.width - gap;
  if (y + rect.height > window.innerHeight - 12) y = event.clientY - rect.height - gap;
  hoverCard.style.left = Math.max(12, x) + "px";
  hoverCard.style.top = Math.max(12, y) + "px";
}

function showHoverCard(hotspot, event) {
  if (!hotspot.dataset.card) return;
  hoverCardImage.src = assetUrl(hotspot.dataset.card);
  hoverCardImage.alt = hotspot.getAttribute("aria-label");
  hoverCard.classList.add("is-visible");
  hoverCard.setAttribute("aria-hidden", "false");
  positionHoverCard(event);
}

function hideHoverCard() {
  hoverCard.classList.remove("is-visible");
  hoverCard.setAttribute("aria-hidden", "true");
}

document.addEventListener("pointerover", function(event) {
  const hotspot = event.target.closest(".hotspot[data-card]");
  if (hotspot) showHoverCard(hotspot, event);
});

document.addEventListener("pointermove", function(event) {
  if (hoverCard.classList.contains("is-visible")) positionHoverCard(event);
});

document.addEventListener("pointerout", function(event) {
  const hotspot = event.target.closest(".hotspot[data-card]");
  if (hotspot && !hotspot.contains(event.relatedTarget)) hideHoverCard();
});

document.addEventListener("click", function(event) {
  const hotspot = event.target.closest(".hotspot[data-card]");
  if (!hotspot) return;
  hideHoverCard();
  detailImage.src = assetUrl(hotspot.dataset.card);
  detailImage.alt = hotspot.getAttribute("aria-label");
  detailDialog.showModal();
});

dialogClose.addEventListener("click", function() {
  detailDialog.close();
});

detailDialog.addEventListener("click", function(event) {
  if (event.target === detailDialog) detailDialog.close();
});

function clamp(value, min, max) {
  return Math.min(max === undefined ? 1 : max, Math.max(min === undefined ? 0 : min, value));
}

function range(value, start, end) {
  return clamp((value - start) / (end - start));
}

function smooth(value) {
  return value * value * (3 - 2 * value);
}

function mix(from, to, progress) {
  return from + (to - from) * progress;
}

function chapterProgress(chapter) {
  const rect = chapter.getBoundingClientRect();
  const travel = Math.max(1, rect.height - window.innerHeight);
  return clamp(-rect.top / travel);
}

let ticking = false;

function resize() {
  const coverScale = Math.max(window.innerWidth / SCENE_WIDTH, window.innerHeight / SCENE_HEIGHT);
  document.documentElement.style.setProperty("--scene-scale", coverScale.toFixed(5));
  requestUpdate();
}

function updateHero(progress) {
  const leafExit = smooth(range(progress, 0.04, 0.27));
  const houseJourney = smooth(range(progress, 0.25, 0.74));
  const copyReveal = smooth(range(progress, 0.52, 0.78));

  heroLeaves.forEach(function(leaf, index) {
    const local = smooth(range(leafExit, index * 0.02, 0.80 + index * 0.02));
    const flutter = Math.sin(local * Math.PI) * (index % 2 === 0 ? 28 : -28);
    const x = Number(leaf.dataset.dx) * local + flutter;
    const y = Number(leaf.dataset.dy) * local;
    const rotation = Number(leaf.dataset.rotation) * local;
    leaf.style.transform = "translate3d(" + x + "px," + y + "px,0) rotate(" + rotation + "deg) scale(" + mix(1, 1.08, local) + ")";
    leaf.style.opacity = 1 - range(local, 0.70, 1);
  });

  heroHouse.style.transform = "translate3d(" + mix(0, 208, houseJourney) + "px," + mix(0, 0, houseJourney) + "px,0) scale(" + mix(1, 0.568, houseJourney) + ")";
  heroHouse.style.opacity = 1;
  houseCopy.style.opacity = copyReveal;
  houseCopy.style.transform = "translate3d(0," + mix(24, 0, copyReveal) + "px,0)";

  const recallReveal = smooth(range(progress, 0.58, 0.64)) * (1 - smooth(range(progress, 0.9, 0.97)));
  setRecallVisibility("hero", recallReveal);
}

function updateLeaves(progress) {
  const leafTravel = range(progress, 0.60, 0.95);
  fallingLeaves.forEach(function(leaf, index) {
    const lane = Number(leaf.dataset.lane);
    const row = Number(leaf.dataset.row);
    const delay = lane * 0.018 + row * 0.025;
    const local = smooth(range(leafTravel, delay, Math.min(1, delay + 0.62)));
    const wave = Math.sin(local * Math.PI * (3.1 + (index % 4) * 0.35) + index * 0.72) * (48 + lane * 6);
    const x = -(500 + lane * 60 + row * 45) * local + wave;
    const y = (1280 + row * 115 + (index % 4) * 65) * local;
    const rotation = (index % 2 === 0 ? 1 : -1) * (55 + (index % 6) * 21) * local;
    leaf.style.opacity = Math.sin(Math.PI * clamp(local)) * 0.96;
    leaf.style.transform = "translate3d(" + x + "px," + y + "px,0) rotate(" + rotation + "deg) scale(" + mix(1.08, 0.52, local) + ")";
  });
}

function updateHorizontal(progress) {
  const partEnter = smooth(range(progress, 0.015, 0.12));
  const handoff = smooth(range(progress, 0.30, 0.52));
  const fade = smooth(range(progress, 0.66, 0.91));
  const outgoing = 1 - smooth(range(fade, 0, 0.50));
  const incoming = smooth(range(fade, 0.50, 1));

  horizontalTrack.style.transform = "translate3d(" + (-handoff * window.innerWidth) + "px,0,0)";
  horizontalTrack.style.opacity = outgoing;
  horizontalTrack.style.pointerEvents = outgoing > 0.7 ? "auto" : "none";
  scenes.bridge.style.opacity = incoming;
  scenes.bridge.style.pointerEvents = incoming > 0.85 ? "auto" : "none";

  roofCopy.style.opacity = smooth(range(progress, 0.04, 0.11));
  roofCopy.style.transform = "translate3d(0," + mix(20, 0, partEnter) + "px,0)";

  roofPartElements.forEach(function(part, index) {
    const local = smooth(range(partEnter, index * 0.018, 0.72 + index * 0.018));
    const direction = index % 2 === 0 ? -1 : 1;
    part.style.opacity = local;
    part.style.transform = "translate3d(" + (direction * mix(260, 0, local)) + "px,0,0) scale(" + mix(0.84, 1, local) + ")";
  });

  const hotspotReveal = smooth(range(progress, 0.17, 0.21));
  roofHotspots.forEach(function(hotspot) {
    hotspot.style.opacity = hotspotReveal;
    hotspot.style.transform = "scale(" + mix(0.4, 1, hotspotReveal) + ")";
    hotspot.style.pointerEvents = hotspotReveal > 0.95 ? "auto" : "none";
  });

  bridgeParts.forEach(function(part) {
    part.style.transform = "none";
  });
  bridgeCopy.style.opacity = 1;
  bridgeLines.concat(bridgeHotspots).forEach(function(element) {
    element.style.opacity = 1;
  });

  const roofRecall = smooth(range(progress, 0.14, 0.18)) * (1 - smooth(range(progress, 0.27, 0.31)));
  const peopleRecall = smooth(range(progress, 0.53, 0.56)) * (1 - smooth(range(progress, 0.64, 0.68)));
  const bridgeRecall = smooth(range(progress, 0.92, 0.95));
  setRecallVisibility("roof", roofRecall);
  setRecallVisibility("people", peopleRecall);
  setRecallVisibility("bridge", bridgeRecall);

  updateLeaves(progress);
}

function updateStones(progress) {
  const enter = smooth(range(progress, 0.025, 0.18));
  const exit = smooth(range(progress, 0.72, 0.94));
  const radiusX = 615;
  const radiusY = 300;
  const centerX = 720;
  const centerY = 450;

  stones.forEach(function(stone) {
    const displayAngle = Number(stone.dataset.displayAngle);
    let angle = displayAngle;
    if (enter < 1) {
      angle = mix(displayAngle + Math.PI * 1.08, displayAngle, enter);
    } else if (exit > 0) {
      angle = mix(displayAngle, displayAngle - Math.PI * 1.08, exit);
    }

    const width = Number(stone.dataset.width);
    const height = Number(stone.dataset.height);
    const x = centerX + Math.cos(angle) * radiusX - width / 2;
    const y = centerY + Math.sin(angle) * radiusY - height / 2;
    const depth = (Math.sin(angle) + 1) / 2;
    const scale = 0.72 + depth * 0.30;

    stone.style.opacity = Math.min(1, enter * 1.4) * (1 - range(exit, 0.76, 1));
    stone.style.zIndex = String(10 + Math.round(depth * 20));
    stone.style.transform = "translate3d(" + x + "px," + y + "px,0) scale(" + scale + ")";
  });

  const copyEnter = smooth(range(progress, 0.15, 0.24));
  stoneCopy.style.opacity = copyEnter * (1 - exit);
  stoneCopy.style.transform = "translate3d(0," + mix(18, 0, copyEnter) + "px,0)";

  const recallReveal = smooth(range(progress, 0.22, 0.27)) * (1 - smooth(range(progress, 0.68, 0.74)));
  setRecallVisibility("stones", recallReveal);
}

function updateTrees(progress) {
  const enter = smooth(range(progress, 0.025, 0.13));
  const copyEnter = smooth(range(progress, 0.08, 0.17));
  const settle = Math.sin(enter * Math.PI) * 16;

  trees[0].style.opacity = enter;
  trees[0].style.transform = "translate3d(" + mix(-520, 0, enter) + "px," + (mix(120, 0, enter) - settle) + "px,0) scale(" + mix(1.72, 1, enter) + ")";
  trees[1].style.opacity = smooth(range(progress, 0.04, 0.145));
  trees[1].style.transform = "translate3d(" + mix(520, 0, enter) + "px," + (mix(90, 0, enter) + settle * 0.4) + "px,0) scale(" + mix(1.58, 1, enter) + ")";
  treeCopy.style.opacity = copyEnter;
  treeCopy.style.transform = "translate3d(0," + mix(22, 0, copyEnter) + "px,0)";

  setRecallVisibility("trees", smooth(range(progress, 0.2, 0.25)));
}

function update() {
  ticking = false;
  updateHero(chapterProgress(chapters.hero));
  updateHorizontal(chapterProgress(chapters.horizontal));
  updateStones(chapterProgress(chapters.stones));
  updateTrees(chapterProgress(chapters.trees));
}

function requestUpdate() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(update);
}

window.addEventListener("resize", resize, { passive: true });
window.addEventListener("scroll", requestUpdate, { passive: true });
let savedLanguage = "en";
try {
  savedLanguage = window.localStorage.getItem("spring-language") || "en";
} catch (error) {
  savedLanguage = "en";
}
applyLanguage(savedLanguage);
resize();
