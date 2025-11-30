export interface CrisisDetectionResult {
  isCrisis: boolean;
  severity: 'low' | 'medium' | 'high';
  keywords: string[];
  message: string;
  resources: CrisisResource[];
}

export interface CrisisResource {
  name: string;
  phone: string;
  description: string;
  available: string;
}

// Philippines Crisis Hotlines
export const CRISIS_RESOURCES: CrisisResource[] = [
  {
    name: 'NCMH Crisis Hotline',
    phone: '0917-899-8727',
    description: 'National Center for Mental Health 24/7 crisis line',
    available: '24/7',
  },
  {
    name: 'Hopeline Philippines',
    phone: '0917-558-4673',
    description: 'Suicide prevention and emotional crisis intervention',
    available: '24/7',
  },
  {
    name: 'In Touch Crisis Line',
    phone: '0917-800-1123',
    description: 'Community and family services crisis support',
    available: '24/7',
  },
  {
    name: 'DOH Mental Health Hotline',
    phone: '1553',
    description: 'Department of Health mental health support',
    available: 'Mon-Fri 8AM-5PM',
  },
];

// Crisis keywords organized by severity
const HIGH_SEVERITY_KEYWORDS = [
  'suicide',
  'kill myself',
  'end my life',
  'want to die',
  'better off dead',
  'no reason to live',
  'suicide plan',
  'goodbye forever',
  'final goodbye',
];

const MEDIUM_SEVERITY_KEYWORDS = [
  'self harm',
  'cut myself',
  'hurt myself',
  'hate myself',
  'worthless',
  'hopeless',
  'can\'t go on',
  'give up',
  'no point',
  'everyone would be better',
];

const LOW_SEVERITY_KEYWORDS = [
  'depressed',
  'anxious',
  'scared',
  'overwhelmed',
  'stressed',
  'panic',
  'crisis',
  'emergency',
];

/**
 * Detects crisis-related content in user messages
 * @param message - The user's message to analyze
 * @returns CrisisDetectionResult with severity and resources
 */
export function detectCrisis(message: string): CrisisDetectionResult {
  const lowerMessage = message.toLowerCase();
  const foundKeywords: string[] = [];
  let severity: 'low' | 'medium' | 'high' = 'low';
  let isCrisis = false;

  // Check high severity keywords
  for (const keyword of HIGH_SEVERITY_KEYWORDS) {
    if (lowerMessage.includes(keyword)) {
      foundKeywords.push(keyword);
      severity = 'high';
      isCrisis = true;
    }
  }

  // Check medium severity keywords if no high severity found
  if (!isCrisis) {
    for (const keyword of MEDIUM_SEVERITY_KEYWORDS) {
      if (lowerMessage.includes(keyword)) {
        foundKeywords.push(keyword);
        severity = 'medium';
        isCrisis = true;
      }
    }
  }

  // Check low severity keywords if no crisis detected yet
  if (!isCrisis) {
    for (const keyword of LOW_SEVERITY_KEYWORDS) {
      if (lowerMessage.includes(keyword)) {
        foundKeywords.push(keyword);
        severity = 'low';
        // Low severity doesn't trigger crisis mode by default
      }
    }
  }

  // Generate appropriate message based on severity
  let responseMessage = '';
  if (severity === 'high') {
    responseMessage = "I'm concerned about what you're sharing. Your safety is the most important thing right now. Please reach out to a crisis counselor immediately.";
  } else if (severity === 'medium') {
    responseMessage = "It sounds like you're going through a really difficult time. While I'm here to listen, speaking with a trained counselor could provide the support you need.";
  } else if (foundKeywords.length > 0) {
    responseMessage = "I hear that you're struggling. Remember, professional support is available if you need it.";
  }

  return {
    isCrisis,
    severity,
    keywords: foundKeywords,
    message: responseMessage,
    resources: isCrisis ? CRISIS_RESOURCES : [],
  };
}

/**
 * Get crisis resources for display
 */
export function getCrisisResources(): CrisisResource[] {
  return CRISIS_RESOURCES;
}
