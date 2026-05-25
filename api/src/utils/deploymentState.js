const DEPLOYMENT_STATES = {
  PENDING: 'PENDING',
  QUEUED: 'QUEUED',
  BUILDING: 'BUILDING',
  DEPLOYING: 'DEPLOYING',
  HEALTH_CHECKING: 'HEALTH_CHECKING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

const ALLOWED_TRANSITIONS = {
  [DEPLOYMENT_STATES.PENDING]: [DEPLOYMENT_STATES.QUEUED],
  [DEPLOYMENT_STATES.QUEUED]: [DEPLOYMENT_STATES.BUILDING],
  [DEPLOYMENT_STATES.BUILDING]: [DEPLOYMENT_STATES.DEPLOYING],
  [DEPLOYMENT_STATES.DEPLOYING]: [DEPLOYMENT_STATES.HEALTH_CHECKING],
  [DEPLOYMENT_STATES.HEALTH_CHECKING]: [DEPLOYMENT_STATES.SUCCESS, DEPLOYMENT_STATES.FAILED],
  [DEPLOYMENT_STATES.SUCCESS]: [], // Terminal state
  [DEPLOYMENT_STATES.FAILED]: []   // Terminal state
};

/**
 * Validates if a transition from currentState to nextState is allowed.
 * 
 * @param {string} currentState - The current state of the deployment
 * @param {string} nextState - The desired next state
 * @returns {boolean} True if the transition is valid, false otherwise
 */
const isValidTransition = (currentState, nextState) => {
  const allowedNextStates = ALLOWED_TRANSITIONS[currentState];
  if (!allowedNextStates) {
    return false;
  }
  return allowedNextStates.includes(nextState);
};

/**
 * Transitions the deployment to a new state if valid, otherwise throws an Error.
 * 
 * @param {string} currentState - The current state
 * @param {string} nextState - The target state to transition to
 * @returns {string} The new valid state
 * @throws {Error} If the transition is invalid
 */
const transitionState = (currentState, nextState) => {
  if (!isValidTransition(currentState, nextState)) {
    throw new Error(`Invalid state transition: Cannot transition from ${currentState} to ${nextState}`);
  }
  return nextState;
};

module.exports = {
  DEPLOYMENT_STATES,
  isValidTransition,
  transitionState
};
