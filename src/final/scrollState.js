const heroState = {
  progress: 0,
  velocity: 0,
};

export function setHeroScrollState(progress, velocity = 0) {
  heroState.progress = Math.max(0, Math.min(1, progress || 0));
  heroState.velocity = Number.isFinite(velocity) ? velocity : 0;
}

export function getHeroScrollState() {
  return heroState;
}
