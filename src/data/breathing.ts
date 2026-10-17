import catalog from './breathing-catalog.json';

export const BREATHING_STYLES = catalog;
export type StyleId = typeof catalog[number]['id'];

/** Canon labels live in JSON; eligibility and ownership are game rules. */
export function getStyle(styleId: string) {
  const style = BREATHING_STYLES.find(style => style.id === styleId);
  if (!style) throw new Error(`Unknown breathing style: ${styleId}`);
  return style;
}

export function getFormMenu(styleId: string, playerLevel: number, specialMissionComplete = false) {
  if (!Number.isInteger(playerLevel) || playerLevel < 1 || playerLevel > 50) {
    throw new Error('Player level must be an integer from 1 through 50');
  }
  const style = getStyle(styleId);
  // Unknown canon slots remain visible documentation, never purchase options.
  const knownForms = style.forms.filter(form => form.status !== 'unrevealed');
  const styleAccessible = playerLevel >= style.minimumStyleLevel &&
    (style.access !== 'special-mission' || specialMissionComplete);
  return style.forms.map(form => {
    const index = knownForms.findIndex(candidate => candidate.id === form.id);
    const unlockLevel = index < 0 ? null : index < 2 ? 1 :
      Math.round(1 + (index - 1) * 29 / (knownForms.length - 2));
    return {
      ...form,
      unlockLevel,
      effectiveUnlockLevel: unlockLevel === null ? null : Math.max(style.minimumStyleLevel, unlockLevel),
      grantedOnStyleAcquisition: index >= 0 && index < 2,
      levelEligible: styleAccessible && unlockLevel !== null && playerLevel >= unlockLevel,
      // Costs, mastery prerequisites and ownership are deliberately not invented here.
      purchaseCost: null,
      upgradeCosts: null,
      requiresFormIds: form.status === 'sequence' ? knownForms.filter(other => other.id !== form.id).map(other => other.id) : [],
    };
  });
}
