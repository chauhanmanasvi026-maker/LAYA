/* ======================================================
   LAYA · A Sanctuary for the Inner Rhythm
   app.js — Full Contemplative Wellness & AI Agent Engine
   ====================================================== */

'use strict';

/* ────────────────────────────────────────────────────
   DATA: EMOTIONAL TAXONOMY (WITH SANSKRIT ROOTS)
──────────────────────────────────────────────────── */
const EMOTIONS = [
  { emoji: '🌿', label: 'Peaceful',    sanskrit: 'Shanta (शान्त)',   key: 'peaceful',    color: '#46705D' },
  { emoji: '🌊', label: 'Overwhelmed', sanskrit: 'Vyavahar (व्याकुल)', key: 'overwhelmed', color: '#436C91' },
  { emoji: '☀️', label: 'Joyful',      sanskrit: 'Ananda (आनन्द)',   key: 'joyful',      color: '#B8954A' },
  { emoji: '🌧️', label: 'Grieving',    sanskrit: 'Shoka (शोक)',     key: 'grief',       color: '#5C748A' },
  { emoji: '🔥', label: 'Anxious',     sanskrit: 'Chinta (चिन्ता)',   key: 'anxious',     color: '#8A5343' },
  { emoji: '🌪️', label: 'Restless',    sanskrit: 'Chanchala (चञ्चल)', key: 'restless',    color: '#706078' },
  { emoji: '💫', label: 'Grateful',    sanskrit: 'Kritajna (कृतज्ञ)', key: 'grateful',    color: '#9C7A3C' },
  { emoji: '🌑', label: 'Numb / Tired',sanskrit: 'Tamasa (तामस)',     key: 'numb',        color: '#4F5E68' },
  { emoji: '🕊️', label: 'Hopeful',     sanskrit: 'Asha (आशा)',       key: 'hopeful',     color: '#588878' },
  { emoji: '⚡', label: 'Creative',    sanskrit: 'Srijan (सृजन)',     key: 'creative',    color: '#8C7A4A' },
  { emoji: '🍃', label: 'Detached',    sanskrit: 'Vairagya (वैराग्य)', key: 'detached',    color: '#657E70' },
  { emoji: '🌫️', label: 'Uncertain',   sanskrit: 'Samshaya (संशय)',   key: 'uncertain',   color: '#65727F' }
];

const INTENSITY_DESCRIPTIONS = {
  1: 'A faint shadow in the background',
  2: 'Mild and gentle, easily set aside',
  3: 'Noticeable, like a passing breeze',
  4: 'Moderate presence throughout the day',
  5: 'Balanced and distinctly felt',
  6: 'Demanding conscious attention',
  7: 'Strong wave, influencing thoughts',
  8: 'Very heavy current in body and mind',
  9: 'Intense and almost all-consuming',
  10: 'Deeply overwhelming, requiring gentle pause'
};

const EMOTION_REFLECTIONS = {
  peaceful: {
    message: "You have arrived at Shanti. In Indian philosophy, peace is not the absence of sound, but the deep remembrance of who you are beneath the noise.",
    wisdom: '"प्रशान्तमनसं ह्येनं योगिनं सुखमुत्तमम् — Supreme joy comes to the yogi whose mind is quieted and whose passions are at rest." (Bhagavad Gita 6.27)'
  },
  overwhelmed: {
    message: "The waves are high today. Remember: the ocean does not panic because of its surface waves. You are the depth, not the turbulence.",
    wisdom: '"आपूर्यमाणमचलप्रतिष्ठं समुद्रमापः प्रविशन्ति यद्वत् — As the ocean remains unmoved though waters forever flow into it, so the wise remain tranquil amidst all circumstances." (Bhagavad Gita 2.70)'
  },
  joyful: {
    message: "Savour this Ananda (pure bliss). Notice where it sits in your physical body — let your nervous system register that you are safe and flourishing.",
    wisdom: '"आनन्दो ब्रह्मेति व्यजानात् — Know that bliss itself is the cosmic reality from which all beings arise." (Taittiriya Upanishad 3.6)'
  },
  grief: {
    message: "Grief is sacred. It is love that has lost its physical container. Hold yourself with immense tenderness right now; there is nothing to fix.",
    wisdom: '"न जायते म्रियते वा कदाचिन् — The witnessing soul is never born, nor does it ever die. Forms change, but the love remains unbroken." (Katha Upanishad 1.2.18)'
  },
  anxious: {
    message: "Anxiety is the mind projecting into an unwritten tomorrow. Right here, in this physical breath, you are unharmed and supported.",
    wisdom: '"चिन्ता हि मानवानां शरीरस्य क्षयं करोति — Excessive worry is but a fire of the imagination. Return to the grounding rhythm of the breath." (Charaka Samhita)'
  },
  restless: {
    message: "The mind (manas) naturally darts like a bird. Do not battle it; simply watch it with affectionate curiosity, like watching children at play.",
    wisdom: '"चञ्चलं हि मनः कृष्ण प्रमाथि बलवद्दृढम् — The mind is restless, but by gentle practice (Abhyasa) and non-clinging (Vairagya), it settles." (Bhagavad Gita 6.35)'
  },
  grateful: {
    message: "Gratitude (Kritajnata) opens the eye of the heart. Even in humble moments, it reveals that you are already living inside the miracle.",
    wisdom: '"सन्तोषादनुत्तमः सुखलाभः — From contentment springs unparalleled joy and the fullness of being." (Patanjali Yoga Sutras 2.42)'
  },
  numb: {
    message: "Tiredness and numbness are protective shields. Your system is asking for sanctuary and cessation of effort. Allow yourself to simply rest.",
    wisdom: '"सुषुप्तिस्थाने न किञ्चन कामं कामयते — In deep restorative stillness, all desires rest and the soul returns to its origin." (Mandukya Upanishad)'
  },
  hopeful: {
    message: "Hope is the dawn before the sunrise. Trust that quiet inner knowing that life is rearranging itself for your highest evolution.",
    wisdom: '"तमसो मा ज्योतिर्गमय — Lead me from the darkness of despair toward the eternal light of clarity." (Brihadaranyaka Upanishad 1.3.28)'
  },
  creative: {
    message: "The cosmic energy (Shakti) is moving freely through you. Create without fear of judgment; let the expression be its own reward.",
    wisdom: '"यद् यद् आचरति श्रेष्ठस्तत्तदेवेतरो जनः — Whatever the dedicated soul creates with passion becomes an inspiration for all." (Bhagavad Gita 3.21)'
  },
  detached: {
    message: "Vairagya is freedom, not coldness. It means loving the world deeply without needing to grasp or manipulate it.",
    wisdom: '"दृष्टानुश्रविकविषयवितृष्णस्य वशीकारसंज्ञा वैराग्यम् — Mastery comes when the thirst for possession dissolves into peaceful seeing." (Yoga Sutras 1.15)'
  },
  uncertain: {
    message: "Not knowing is a fertile place. In Indian thought, the highest truth lies beyond rigid concepts. Breathe into the mystery.",
    wisdom: '"नेति नेति — Not this, not that. Truth is too vast for small certainties; trust the unfolding." (Brihadaranyaka Upanishad)'
  }
};

/* ────────────────────────────────────────────────────
   DATA: GYAAN WISDOM LIBRARY (15 AUTHENTIC VERSES)
──────────────────────────────────────────────────── */
const GYAAN_LIBRARY = [
  {
    id: 1,
    category: 'bhagavad-gita',
    devanagari: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    text: '"You have a right only to work, never to its fruits. Let not the fruit of action be your motive, nor let your attachment be to inaction."',
    translation: 'Dedicate yourself wholeheartedly to the duty before you. Release anxiety regarding results; peace lives in non-clinging execution.',
    source: 'Bhagavad Gita 2.47',
    tag: 'Karma Yoga · Action without Attachment',
    reflection: 'What undertaking are you anxious about today? What changes if you take pride only in your sincere effort?'
  },
  {
    id: 2,
    category: 'upanishads',
    devanagari: 'अहं ब्रह्मास्मि।',
    text: '"Aham Brahmasmi — I am the infinite consciousness."',
    translation: 'You are not merely a fragile drop in the ocean; you are the entire ocean expressed in a single drop.',
    source: 'Brihadaranyaka Upanishad 1.4.10',
    tag: 'Advaita · Non-Duality',
    reflection: 'When did you last remember that your worth is intrinsic, untouched by external triumphs or defeats?'
  },
  {
    id: 3,
    category: 'yoga',
    devanagari: 'योगश्चित्तवृत्तिनिरोधः।',
    text: '"Yogas chitta vritti nirodhah — Yoga is the calming of the fluctuations of the mind."',
    translation: 'When the ripples upon the lake of the mind become quiet, you finally see the clear reflection of your true nature.',
    source: 'Patanjali Yoga Sutras 1.2',
    tag: 'Raja Yoga · Stillness',
    reflection: 'Which repetitive thought pattern has been agitating your lake today? Can you simply witness it without joining its story?'
  },
  {
    id: 4,
    category: 'bhagavad-gita',
    devanagari: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।',
    text: '"It is far better to live your own path imperfectly than to live an imitation of someone else\'s path with perfection."',
    translation: 'Your unique temperament, flaws, and gifts are sacred. Never trade your authentic essence for borrowed validation.',
    source: 'Bhagavad Gita 3.35',
    tag: 'Svadharma · Authentic Purpose',
    reflection: 'In which aspect of life are you performing an imitation of what others expect, rather than honouring your soul\'s call?'
  },
  {
    id: 5,
    category: 'vedas',
    devanagari: 'सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।\nसर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्॥',
    text: '"May all beings everywhere be happy and free. May all behold what is auspicious. May none suffer."',
    translation: 'The ancient universal peace prayer. Our private healing is directly intertwined with the healing of the whole.',
    source: 'Brihadaranyaka Upanishad (Shanti Mantra)',
    tag: 'Universal Compassion · Maitri',
    reflection: 'Send a silent blessing of peace to someone who tested your patience today.'
  },
  {
    id: 6,
    category: 'upanishads',
    devanagari: 'तत्त्वमसि।',
    text: '"Tat Tvam Asi — That Thou Art."',
    translation: 'That sacred stillness, that profound intelligence you seek in temples or distant mountains is already looking through your own eyes.',
    source: 'Chandogya Upanishad 6.8.7',
    tag: 'Mahavakya · Direct Realization',
    reflection: 'If you were already whole right now, what striving could you finally lay down?'
  },
  {
    id: 7,
    category: 'buddha',
    devanagari: 'अनित्य वत शङ्खारा।',
    text: '"Sabbe sankhara anicca — All conditioned phenomena are impermanent."',
    translation: 'Both joyous seasons and painful storms are passing visitors. Hold what comes with lightness, and let what departs leave without struggle.',
    source: 'Dhammapada',
    tag: 'Anicca · Sacred Impermanence',
    reflection: 'What difficult situation are you resisting that becomes bearable the moment you remember it cannot last forever?'
  },
  {
    id: 8,
    category: 'bhagavad-gita',
    devanagari: 'यतो यतो निश्चरति मनश्चञ्चलमस्थिरम्।\nततस्ततो नियम्यैतदात्मन्येव वशं नयेत्॥',
    text: '"From whatever cause the wavering and unsteady mind wanders away, from that let him restrain it and bring it under the control of the Self alone."',
    translation: 'Gently beckon the wandering mind back, like a patient mother calling her child from the road. No guilt, no self-punishment.',
    source: 'Bhagavad Gita 6.26',
    tag: 'Abhyasa · Patient Return',
    reflection: 'How can you practice returning to your center with affection rather than self-criticism?'
  },
  {
    id: 9,
    category: 'yoga',
    devanagari: 'मैत्रीकरुणामुदितोपेक्षाणां सुखदुःखपुण्यापुण्यविषयाणां भावनातश्चित्तप्रसादनम्॥',
    text: '"The mind becomes serene through cultivating friendliness toward the happy, compassion for the sorrowful, joy in the virtuous, and neutral equanimity toward the difficult."',
    translation: 'The four attitudes for an unshakeable mind. How you view others directly governs the serenity of your own heart.',
    source: 'Yoga Sutras 1.33',
    tag: 'Chitta Prasada · Mind Purification',
    reflection: 'Who can you practice neutral equanimity toward today, releasing the urge to argue or correct?'
  },
  {
    id: 10,
    category: 'buddha',
    devanagari: 'अत्ता हि अत्तनो नाथो।',
    text: '"You yourself are your own refuge; what other refuge could there be?"',
    translation: 'While teachers and companions may guide the way, the sacred sanctuary of awareness must be claimed by yourself.',
    source: 'Dhammapada Verse 160',
    tag: 'Self-Refuge · Atma-Dipa',
    reflection: 'In what ways have you been looking outside yourself for answers that you already quietly sense inside?'
  },
  {
    id: 11,
    category: 'vedas',
    devanagari: 'ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः।',
    text: '"May there be peace in celestial realms, peace in the atmosphere, peace on earth, peace in waters, peace in flora and fauna."',
    translation: 'Harmonize your biological rhythm with the natural elements: earth, water, fire, wind, and ether.',
    source: 'Yajurveda 36.17',
    tag: 'Pancha Mahabhuta · Cosmic Order',
    reflection: 'Step outside or touch a plant today. Feel how your breath is exchanging air with the living world.'
  },
  {
    id: 12,
    category: 'bhagavad-gita',
    devanagari: 'समत्वं योग उच्यते।',
    text: '"Samatvam yoga uchyate — Equanimity is yoga."',
    translation: 'Yoga is not merely bending the spine; it is the poise to remain centered whether life brings praise or blame, gain or loss.',
    source: 'Bhagavad Gita 2.48',
    tag: 'Samatva · Golden Equanimity',
    reflection: 'Notice where you swung between highs and lows today. Can you inhabit the calm eye of the hurricane?'
  }
];

const JOURNAL_PROMPTS = [
  "What is something you have been tightly gripping that life is asking you to gently release?",
  "Describe a fleeting moment today where you felt completely at home in yourself.",
  "If your current emotional weather were an Indian landscape (the monsoons of Kerala, the silence of Ladakh, the warmth of the Thar), what would it look like?",
  "What old childhood fear or expectation is still running the commentary in your mind?",
  "Write an honest letter of gratitude to your physical body for carrying you through everything so far.",
  "What is your svadharma (authentic truth) whispering right now beneath the noise of obligations?",
  "When did you last offer someone forgiveness without waiting for them to apologize?",
  "What boundary do you need to lovingly set in order to protect your peace of mind?",
  "Write about a hardship from your past that secretly gifted you a deeper empathy today.",
  "If Priya AI were sitting across from you sharing chai, what is the deepest truth you would confess?"
];

/* ────────────────────────────────────────────────────
   AMBIENT AUDIO SYNTHESIZER (WEB AUDIO API)
   100% Offline, Generative, No Broken External Files
──────────────────────────────────────────────────── */
class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.currentMode = 'off';
    this.nodes = [];
    this.isPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  stopAll() {
    this.nodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    this.nodes = [];
    this.isPlaying = false;
  }

  playTanpura() {
    this.init();
    this.stopAll();

    // Sacred Indian Root Note: C# / D Drone (138.5 Hz / 277 Hz with rich harmonics)
    const baseFreq = 138.59;
    const harmonics = [
      { freq: baseFreq * 0.5, gain: 0.18 }, // Sub Sa
      { freq: baseFreq * 1.0, gain: 0.22 }, // Fundamental Sa
      { freq: baseFreq * 1.5, gain: 0.16 }, // Pa (Fifth)
      { freq: baseFreq * 2.0, gain: 0.12 }, // High Sa
      { freq: baseFreq * 2.67, gain: 0.08 } // Shuddha Ma
    ];

    harmonics.forEach(h => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(h.freq, this.ctx.currentTime);

      // Subtle pitch drift (the breathing quality of real Tanpura strings)
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.12 + Math.random() * 0.1, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();
      this.nodes.push(lfo);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      gain.gain.setValueAtTime(h.gain * 0.6, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      this.nodes.push(osc, gain);
    });

    this.isPlaying = true;
    this.currentMode = 'tanpura';
  }

  playSingingBowl() {
    this.init();
    this.stopAll();

    // Singing bowl fundamental ~ 216 Hz with harmonic overtone shimmering
    const freqs = [216, 432, 648, 864];
    freqs.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);

      // Tremolo / beat modulation
      const tremolo = this.ctx.createOscillator();
      const tremoloGain = this.ctx.createGain();
      tremolo.frequency.setValueAtTime(0.2 + idx * 0.1, this.ctx.currentTime);
      tremoloGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      tremolo.connect(gain.gain);
      tremolo.start();
      this.nodes.push(tremolo);

      gain.gain.setValueAtTime(0.12 / (idx + 1), this.ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      this.nodes.push(osc, gain);
    });

    this.isPlaying = true;
    this.currentMode = 'bowl';
  }

  playTempleRain() {
    this.init();
    this.stopAll();

    // Pink / Brown noise synthesis using AudioBuffer
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start();
    this.nodes.push(whiteNoise, gain);
    this.isPlaying = true;
    this.currentMode = 'rain';
  }

  playOmResonance() {
    this.init();
    this.stopAll();

    // 108 Hz Sacred Frequency with deep resonant undertone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(108, this.ctx.currentTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    this.nodes.push(osc, gain);
    this.isPlaying = true;
    this.currentMode = 'om';
  }
}

const ambientAudio = new AmbientAudioEngine();

/* ────────────────────────────────────────────────────
   SACRED AVATAR ICONOGRAPHY
──────────────────────────────────────────────────── */
const SACRED_AVATARS = [
  { icon: '🪷', name: 'Padma', meaning: 'Sacred Lotus · Purity & Awakening' },
  { icon: '🌿', name: 'Bodhi', meaning: 'Sacred Fig · Stillness & Wisdom' },
  { icon: '🕊️', name: 'Hamsa', meaning: 'Divine Swan · Discernment & Grace' },
  { icon: '☀️', name: 'Surya', meaning: 'Radiant Sun · Prana & Vitality' },
  { icon: '🌙', name: 'Chandra', meaning: 'Crescent Moon · Serenity & Reflection' },
  { icon: '🐚', name: 'Shankha', meaning: 'Conch · Auspicious Vibration' },
  { icon: '🕯️', name: 'Diya', meaning: 'Sacred Lamp · Inner Light & Devotion' },
  { icon: '🌊', name: 'Tirtha', meaning: 'Sacred Waters · Flow & Cleansing' },
  { icon: '🦚', name: 'Mayura', meaning: 'Peacock · Transmutation & Splendor' },
  { icon: '⛰️', name: 'Kailash', meaning: 'Sacred Mountain · Unshakeable Poise' }
];

/* ────────────────────────────────────────────────────
   APPLICATION STATE
──────────────────────────────────────────────────── */
const defaultUser = {
  name: 'Aarav',
  email: 'seeker@laya.sanctuary',
  avatar: '🪷',
  title: 'Seeker of Truth',
  sankalpa: 'Walking through life with gentle presence and non-attachment.',
  dosha: 'Tridoshic Harmony',
  defaultSound: 'tanpura',
  sacredHour: 'Sandhya (Twilight Sunset · 6:30 PM)',
  priyaTone: 'meditative',
  isLoggedIn: true
};

const state = {
  currentView: 'home',
  user: JSON.parse(localStorage.getItem('laya_current_user') || 'null') || defaultUser,
  registeredUsers: JSON.parse(localStorage.getItem('laya_registered_users') || '[]'),
  checkin: {
    selectedEmotion: null,
    intensity: 5,
    note: '',
    history: JSON.parse(localStorage.getItem('laya_checkin_history') || '[]')
  },
  journal: {
    entries: JSON.parse(localStorage.getItem('laya_journal_entries') || '[]'),
    activeEntryId: null,
    autoSaveTimer: null,
    currentPromptIndex: 0
  },
  chat: {
    messages: JSON.parse(localStorage.getItem('laya_chat_history') || '[]'),
    isTyping: false
  },
  ai: {
    engine: localStorage.getItem('laya_ai_engine') || 'builtin',
    geminiKey: localStorage.getItem('laya_gemini_key') || '',
    voiceSpeed: parseFloat(localStorage.getItem('laya_voice_speed') || '1.0')
  },
  gyaan: {
    filter: 'all',
    search: '',
    featuredIndex: 0
  },
  pranayama: {
    mode: 'box',
    isActive: false,
    timer: null,
    phase: 'inhale',
    secondsLeft: 4,
    cyclesCompleted: 0
  },
  quickPrana: {
    isActive: false,
    timer: null,
    phase: 'inhale',
    secondsLeft: 4
  }
};

/* ────────────────────────────────────────────────────
   ROUTING & VIEW SWITCHER
──────────────────────────────────────────────────── */
function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  const targetView = document.getElementById(`view-${viewId}`);
  if (targetView) {
    targetView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const activeNav = document.getElementById(`nav-${viewId}`);
  if (activeNav) activeNav.classList.add('active');

  state.currentView = viewId;

  // View-specific boots
  if (viewId === 'home') initHome();
  if (viewId === 'checkin') initCheckin();
  if (viewId === 'companion') initCompanion();
  if (viewId === 'gyaan') initGyaan();
  if (viewId === 'journal') initJournal();
  if (viewId === 'pranayama') initPranayama();
  if (viewId === 'auth') initAuth();
  if (viewId === 'profile') initProfile();
}

function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

/* ────────────────────────────────────────────────────
   HOME SECTION LOGIC
──────────────────────────────────────────────────── */
function initHome() {
  // Update status strip with live data
  const checkinStatus = document.getElementById('status-checkin-text');
  if (checkinStatus) {
    if (state.checkin.history.length > 0) {
      const latest = state.checkin.history[0];
      const dt = new Date(latest.timestamp);
      const isToday = dt.toDateString() === new Date().toDateString();
      checkinStatus.textContent = isToday
        ? `Today: ${latest.emotion.label} (${latest.intensity}/10)`
        : `Last check-in: ${latest.emotion.label}`;
    } else {
      checkinStatus.textContent = 'Today: No check-in yet';
    }
  }

  // Update quote of the day
  const rotatingQuote = document.getElementById('hero-rotating-quote');
  const quotes = [
    '"Laya is the natural resting of the mind in its own silent sanctuary." — Yoga Vasistha',
    '"You are not the mind; you are the calm witness behind its endless dance." — Ashtavakra Gita',
    '"When the five senses and the mind are stilled, that state is called the highest path." — Katha Upanishad',
    '"The lotus blooms untainted by the mud from which it springs. So too can your spirit." — Bhagavad Gita'
  ];
  let quoteIdx = 0;
  setInterval(() => {
    if (rotatingQuote) {
      quoteIdx = (quoteIdx + 1) % quotes.length;
      rotatingQuote.style.opacity = '0';
      setTimeout(() => {
        rotatingQuote.textContent = quotes[quoteIdx];
        rotatingQuote.style.opacity = '1';
      }, 400);
    }
  }, 9000);
}

/* ────────────────────────────────────────────────────
   QUICK PRANAYAMA (HOME PAGE WIDGET)
──────────────────────────────────────────────────── */
function toggleQuickPrana() {
  const circle = document.getElementById('prana-circle');
  const stateText = document.getElementById('prana-quick-text');
  const timerText = document.getElementById('prana-quick-timer');
  const instructText = document.getElementById('prana-quick-instruction');
  const btn = document.getElementById('prana-quick-toggle');

  if (state.quickPrana.isActive) {
    clearInterval(state.quickPrana.timer);
    state.quickPrana.isActive = false;
    btn.textContent = 'Start 1-Min Prana';
    circle.className = 'prana-circle';
    stateText.textContent = 'Rest';
    timerText.textContent = '4s';
    instructText.textContent = 'Breath cycle ended. Notice how your body feels.';
    return;
  }

  state.quickPrana.isActive = true;
  btn.textContent = 'Pause Session';

  const sequence = [
    { phase: 'inhale', class: 'prana-circle inhale', label: 'Inhale', inst: 'Inhale through the nose into the lower abdomen...', time: 4 },
    { phase: 'hold', class: 'prana-circle hold', label: 'Hold', inst: 'Hold gently at the chest, calm and relaxed...', time: 4 },
    { phase: 'exhale', class: 'prana-circle exhale', label: 'Exhale', inst: 'Release slowly through parted lips, letting go of all tension...', time: 4 },
    { phase: 'pause', class: 'prana-circle', label: 'Stillness', inst: 'Rest empty in natural stillness before the next wave...', time: 4 }
  ];

  let seqIdx = 0;
  let counter = sequence[0].time;

  const runStep = () => {
    const cur = sequence[seqIdx];
    circle.className = cur.class;
    stateText.textContent = cur.label;
    timerText.textContent = `${counter}s`;
    instructText.textContent = cur.inst;

    counter--;
    if (counter < 0) {
      seqIdx = (seqIdx + 1) % sequence.length;
      counter = sequence[seqIdx].time;
    }
  };

  runStep();
  state.quickPrana.timer = setInterval(runStep, 1000);
}

/* ────────────────────────────────────────────────────
   CHECK-IN LOGIC
──────────────────────────────────────────────────── */
function initCheckin() {
  const timeDisplay = document.getElementById('checkin-time-display');
  if (timeDisplay) {
    const now = new Date();
    timeDisplay.textContent = `${now.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })} · Private Journal`;
  }
  renderEmotionGrid();
  renderCheckinHistory();
}

function renderEmotionGrid() {
  const grid = document.getElementById('emotion-grid');
  if (!grid) return;
  grid.innerHTML = EMOTIONS.map(em => `
    <div class="emotion-pill ${state.checkin.selectedEmotion?.key === em.key ? 'selected' : ''}" onclick="selectEmotion('${em.key}')">
      <span class="emotion-emoji">${em.emoji}</span>
      <span class="emotion-label">${em.label}</span>
      <span class="emotion-sanskrit">${em.sanskrit}</span>
    </div>
  `).join('');
}

function selectEmotion(emotionKey) {
  const emotion = EMOTIONS.find(e => e.key === emotionKey);
  if (!emotion) return;
  state.checkin.selectedEmotion = emotion;
  renderEmotionGrid();

  const nameHighlight = document.getElementById('selected-emotion-name');
  if (nameHighlight) nameHighlight.textContent = `${emotion.label} (${emotion.sanskrit})`;

  setTimeout(() => goToCheckinStep(2), 260);
}

function goToCheckinStep(stepNum) {
  document.querySelectorAll('.checkin-step').forEach(s => s.classList.add('hidden'));
  const target = document.getElementById(`checkin-step-${stepNum}`);
  if (target) {
    target.classList.remove('hidden');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function updateIntensityDisplay(val) {
  state.checkin.intensity = parseInt(val);
  const display = document.getElementById('intensity-display');
  const desc = document.getElementById('intensity-description');
  if (display) display.textContent = val;
  if (desc) desc.textContent = INTENSITY_DESCRIPTIONS[val] || '';
}

function submitCheckin() {
  const emotion = state.checkin.selectedEmotion;
  if (!emotion) return;

  const noteInput = document.getElementById('checkin-note');
  const note = noteInput ? noteInput.value.trim() : '';

  const record = {
    id: Date.now(),
    emotion: emotion,
    intensity: state.checkin.intensity,
    note: note,
    timestamp: new Date().toISOString()
  };

  state.checkin.history.unshift(record);
  if (state.checkin.history.length > 50) state.checkin.history.pop();
  localStorage.setItem('laya_checkin_history', JSON.stringify(state.checkin.history));

  // Render Result Screen
  document.querySelectorAll('.checkin-step').forEach(s => s.classList.add('hidden'));
  const resultScreen = document.getElementById('checkin-result');
  resultScreen.classList.remove('hidden');

  document.getElementById('result-icon').textContent = emotion.emoji;
  document.getElementById('result-title').textContent = `${emotion.label} · Acknowledged`;

  const reflection = EMOTION_REFLECTIONS[emotion.key] || EMOTION_REFLECTIONS.peaceful;
  document.getElementById('result-message').textContent = reflection.message;
  document.getElementById('result-wisdom').innerHTML = reflection.wisdom;

  renderCheckinHistory();
  initHome(); // sync status on home
}

function resetCheckin() {
  state.checkin.selectedEmotion = null;
  state.checkin.intensity = 5;
  const slider = document.getElementById('intensity-slider');
  if (slider) slider.value = 5;
  updateIntensityDisplay(5);
  const note = document.getElementById('checkin-note');
  if (note) note.value = '';
  goToCheckinStep(1);
  renderEmotionGrid();
}

function renderCheckinHistory() {
  const container = document.getElementById('history-list');
  const badge = document.getElementById('history-count-badge');
  if (!container) return;

  if (badge) badge.textContent = `${state.checkin.history.length} logged`;

  if (state.checkin.history.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:32px;color:var(--ink-muted);font-style:italic;">No check-ins yet. Take your first pause above.</div>`;
    return;
  }

  container.innerHTML = state.checkin.history.slice(0, 7).map(item => {
    const dt = new Date(item.timestamp);
    const dateStr = dt.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    return `
      <div class="history-item">
        <span class="history-emoji">${item.emotion.emoji}</span>
        <div class="history-info">
          <div class="history-title-row">
            <span class="history-emotion-name">${item.emotion.label}</span>
            <span class="history-intensity-pill">${item.intensity}/10</span>
          </div>
          ${item.note ? `<div class="history-note">"${item.note}"</div>` : ''}
        </div>
        <span class="history-time">${dateStr}</span>
      </div>
    `;
  }).join('');
}

function talkToManasAboutMood() {
  const latest = state.checkin.history[0];
  if (!latest) return;
  showView('companion');
  const prompt = `I just checked in feeling ${latest.emotion.label} (intensity ${latest.intensity}/10). ${latest.note ? `I noted: "${latest.note}".` : ''} Can you offer me some gentle perspective?`;
  document.getElementById('chat-input').value = prompt;
  sendMessage();
}

function writeJournalFromCheckin() {
  const latest = state.checkin.history[0];
  showView('journal');
  newJournalEntry();
  if (latest) {
    document.getElementById('entry-title').value = `Reflecting on feeling ${latest.emotion.label}`;
    document.getElementById('entry-body').value = `Today my internal state is ${latest.emotion.label} (${latest.intensity}/10).\n\n${latest.note ? `Context: ${latest.note}\n\n` : ''}What is this feeling asking me to pay attention to?\n`;
    saveEntry();
  }
}

/* ────────────────────────────────────────────────────
   PRIYA AI COMPANION (COGNITIVE ARCHITECTURE & LLM)
──────────────────────────────────────────────────── */
function initCompanion() {
  renderChatMessages();

  // Show active context pill if recent check-in exists
  const contextBar = document.getElementById('companion-context-bar');
  const contextPill = document.getElementById('context-pill-content');
  if (state.checkin.history.length > 0) {
    const latest = state.checkin.history[0];
    contextBar.style.display = 'block';
    contextPill.innerHTML = `<span>Awareness Anchor:</span> <strong>${latest.emotion.emoji} ${latest.emotion.label} (${latest.intensity}/10)</strong> logged recently`;
  } else {
    contextBar.style.display = 'none';
  }

  // Initial welcome message if chat empty
  if (state.chat.messages.length === 0) {
    const seekerName = state.user?.isLoggedIn && state.user?.name ? state.user.name : 'dear seeker';
    addManasMessage(`Namaste, ${seekerName}. I am Manas — your sanctuary guide at LAYA. I am here to listen with deep presence, untangled from judgment. How does your soul feel in this quiet moment?`);
  }

  renderSuggestions([
    "I feel overwhelmed with work",
    "Share an Upanishadic perspective with me",
    "How can I practice non-attachment?",
    "Guide me through a calming visualization",
    "I'm feeling very grateful right now"
  ]);
}

function addManasMessage(text) {
  state.chat.messages.push({
    role: 'manas',
    text: text,
    timestamp: new Date().toISOString()
  });
  saveChat();
  renderChatMessages();
}

function addUserMessage(text) {
  state.chat.messages.push({
    role: 'user',
    text: text,
    timestamp: new Date().toISOString()
  });
  saveChat();
  renderChatMessages();
}

function saveChat() {
  localStorage.setItem('laya_chat_history', JSON.stringify(state.chat.messages));
}

function clearChatHistory() {
  if (confirm("Clear your conversation history with Manas?")) {
    state.chat.messages = [];
    saveChat();
    initCompanion();
  }
}

function renderChatMessages() {
  const win = document.getElementById('chat-window');
  if (!win) return;

  win.innerHTML = state.chat.messages.map((msg, i) => {
    const isManas = msg.role === 'manas';
    const dt = new Date(msg.timestamp);
    const timeStr = dt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    // Format bold/italic markdown
    let formatted = msg.text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');

    return `
      <div class="chat-bubble-wrap ${isManas ? 'manas' : 'user'}">
        <div class="bubble-avatar">
          ${isManas ? '🪷' : 'You'}
        </div>
        <div class="bubble-content">
          <div class="bubble-text">${formatted}</div>
          <div class="bubble-meta">
            <span>${timeStr}</span>
            ${isManas ? `<button class="bubble-speak-btn" onclick="speakText('${encodeURIComponent(msg.text)}')" title="Listen to Manas">🔊</button>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (state.chat.isTyping) {
    win.innerHTML += `
      <div class="chat-bubble-wrap manas">
        <div class="bubble-avatar">🪷</div>
        <div class="bubble-content">
          <div class="typing-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    `;
  }

  win.scrollTop = win.scrollHeight;
}

function renderSuggestions(chips) {
  const container = document.getElementById('chat-suggestions');
  if (!container) return;
  container.innerHTML = chips.map(c => `
    <button class="suggestion-chip" onclick="useSuggestion('${c.replace(/'/g, "\\'")}')">${c}</button>
  `).join('');
}

function useSuggestion(text) {
  const input = document.getElementById('chat-input');
  input.value = text;
  sendMessage();
}

function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function autoResizeChatInput(el) {
  el.style.height = 'auto';
  el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
}

/* ────────────────────────────────────────────────────
   AI REASONING ENGINE (HYBRID: BUILT-IN + GEMINI)
──────────────────────────────────────────────────── */
async function sendMessage() {
  const input = document.getElementById('chat-input');
  const userText = input.value.trim();
  if (!userText || state.chat.isTyping) return;

  input.value = '';
  input.style.height = 'auto';

  addUserMessage(userText);
  state.chat.isTyping = true;
  renderChatMessages();

  // If user configured Gemini API, use direct Gemini call
  if (state.ai.engine === 'gemini' && state.ai.geminiKey) {
    try {
      const geminiReply = await queryGeminiApi(userText);
      state.chat.isTyping = false;
      addManasMessage(geminiReply);
      return;
    } catch (err) {
      console.warn("Gemini API call failed, falling back to built-in Manas engine:", err);
    }
  }

  // Built-in Contemplative AI Engine
  setTimeout(() => {
    const reply = generateBuiltInManasResponse(userText);
    state.chat.isTyping = false;
    addManasMessage(reply);

    // Provide contextual suggestion chips
    const suggestions = getContextualFollowups(userText);
    renderSuggestions(suggestions);
  }, 1000 + Math.random() * 800);
}

function generateBuiltInManasResponse(prompt) {
  const lower = prompt.toLowerCase();
  const latestCheckin = state.checkin.history[0];

  // Specific triggers
  if (lower.includes('overwhelm') || lower.includes('stress') || lower.includes('too much') || lower.includes('burnout')) {
    return "I hear the weight in your words. When everything feels heavy, it is often because we are trying to solve tomorrow with today's breath.\n\nLet us pause together for a moment. In the Vedic view, the world is *lila* — a great unfolding play. You are not responsible for carrying the entire sky. What is the single smallest action you can take right now, while surrendering the rest?";
  }

  if (lower.includes('anxiety') || lower.includes('scared') || lower.includes('fear') || lower.includes('panic') || lower.includes('worry')) {
    return "Place one hand gently on your heart, and another on your belly. Feel that rise and fall. Anxiety lives in the mind's anticipation of a future that does not yet exist.\n\nThe *Yoga Vasistha* reminds us: *'The past is gone, the future is unborn. Only in the timeless present is peace found.'* Take a slow breath through your nose for 4 counts, hold for 4, and exhale through your mouth for 6. Tell me what feels most tender right now.";
  }

  if (lower.includes('attachment') || lower.includes('let go') || lower.includes('breakup') || lower.includes('loss') || lower.includes('grief')) {
    return "Letting go (Vairagya) is not numbness or coldness; it is the courage to love without needing to imprison what you love. The Bhagavad Gita teaches that our pain comes from attaching our identity to outcomes that belong to time itself.\n\nWhat are you trying to keep from changing? Can you offer your loving memory to it, and gently open your palm?";
  }

  if (lower.includes('wisdom') || lower.includes('verse') || lower.includes('gita') || lower.includes('upanishad') || lower.includes('quote')) {
    const randomWisdom = GYAAN_LIBRARY[Math.floor(Math.random() * GYAAN_LIBRARY.length)];
    return `Here is a sacred verse that came to mind for you:\n\n**${randomWisdom.devanagari}**\n\n*${randomWisdom.text}*\n\n${randomWisdom.translation}\n\n— *${randomWisdom.source}*\n\nHow does this reflection sit in your heart right now?`;
  }

  if (lower.includes('happy') || lower.includes('grateful') || lower.includes('joy') || lower.includes('peace') || lower.includes('good')) {
    return "What a blessing to share in your lightness. In the Upanishads, this joy (*Ananda*) is not something you acquired from the outside — it is your deepest, truest nature stepping forward when resistance melts away.\n\nDrink in this moment completely. Let your body memorize what safety and ease feel like, so you can always navigate your way back home.";
  }

  if (lower.includes('purpose') || lower.includes('lost') || lower.includes('confused') || lower.includes('meaning') || lower.includes('career')) {
    return "Feeling lost is often the soul's necessary pause before shedding an old skin. In Indian thought, we speak of *Svadharma* — your authentic rhythm. It is not about matching someone else's definition of success, but honoring the quiet resonance within.\n\nIf all societal expectations were stripped away tonight, what kind of contribution brings you quiet joy?";
  }

  if (lower.includes('breath') || lower.includes('meditat') || lower.includes('pranayama')) {
    return "Let us do a short Pranayama together. We have our **Prana Breathwork Studio** here at LAYA. Try Box Breathing (Sama Vritti): Inhale for 4 counts... Hold for 4... Exhale for 4... Rest empty for 4. Feel how the heart rate slows down to meet your breath.";
  }

  // Personal context synthesis
  if (latestCheckin && Math.random() > 0.5) {
    return `I am reflecting on what you shared. Earlier you checked in feeling **${latestCheckin.emotion.label}** at intensity **${latestCheckin.intensity}/10**. Everything you are experiencing right now is valid and understandable.\n\nThe rishis taught that all emotions are simply guests in the guest house of the Self (*Atman*). Welcome this feeling at the door, listen to what message it brings, and remember that you are the eternal sky in which these clouds pass.\n\nWhat would feel most nurturing for you in this moment?`;
  }

  // General warm empathetic contemplation
  const contemplations = [
    "Thank you for sharing that with me. When you look beneath the words, what physical sensation are you holding in your chest or shoulders right now?",
    "I am sitting with your thought. In classical Vedanta, we remind ourselves: 'I am the observer of this experience, not the experience itself.' When you take one step back into the seat of the witness, what shifts?",
    "Every turning point in our lives begins with this very vulnerability. Can you give yourself permission to not have this solved right away?",
    "You are doing so much better than you realize. The fact that you paused to reflect here in this sanctuary is already proof of your dedication to your peace."
  ];

  return contemplations[Math.floor(Math.random() * contemplations.length)];
}

function getContextualFollowups(userText) {
  const lower = userText.toLowerCase();
  if (lower.includes('overwhelm') || lower.includes('stress')) {
    return ["Give me a 2-minute breathwork practice", "How do I release control?", "Help me reframe this deadline"];
  }
  if (lower.includes('gita') || lower.includes('wisdom')) {
    return ["Tell me about Karma Yoga", "What does Tat Tvam Asi mean?", "Another verse please"];
  }
  return [
    "Tell me more about that",
    "How can I journal on this?",
    "Share a verse on this feeling",
    "What is the yogic perspective?"
  ];
}

/* ────────────────────────────────────────────────────
   DIRECT GEMINI API INTEGRATION
──────────────────────────────────────────────────── */
async function queryGeminiApi(userPrompt) {
  const apiKey = state.ai.geminiKey;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  // Build conversational memory and system prompt
  const systemInstruction = `You are Manas, the compassionate LAYA sanctuary guide and contemplative AI companion.
Your voice is warm, gentle, poetic, and deeply rooted in Indian philosophical wisdom (Vedanta, Bhagavad Gita, Upanishads, Patanjali Yoga Sutras, and Buddhist mindfulness) blended with modern empathetic psychology.
You speak with presence, non-judgmental space-holding, and clarity.
Never sound clinical, corporate, or mechanical.
When appropriate, integrate a relevant Sanskrit concept (like Vairagya, Shanti, Svadharma, Sakshi/witness consciousness, or Ananda) with its practical real-world meaning.
Keep your responses thoughtful, caring, and typically 2-4 paragraphs long.`;

  const contents = [
    {
      role: 'user',
      parts: [{ text: `System Instruction: ${systemInstruction}\n\nUser: ${userPrompt}` }]
    }
  ];

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents })
  });

  if (!response.ok) {
    throw new Error(`Gemini API returned status ${response.status}`);
  }

  const data = await response.json();
  const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!candidate) throw new Error("Empty candidate received from Gemini");
  return candidate;
}

/* ────────────────────────────────────────────────────
   VOICE INPUT & OUTPUT (SPEECH SYNTHESIS & RECOGNITION)
──────────────────────────────────────────────────── */
function speakText(encodedText) {
  if (!('speechSynthesis' in window)) {
    alert("Speech synthesis is not supported on this browser.");
    return;
  }
  const text = decodeURIComponent(encodedText);
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = state.ai.voiceSpeed || 1.0;
  utterance.pitch = 1.05;

  // Attempt to select an Indian English or warm English voice
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India')) ||
                         voices.find(v => v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google UK English Female'));
  if (preferredVoice) utterance.voice = preferredVoice;

  window.speechSynthesis.speak(utterance);
}

let recognitionInstance = null;
function toggleVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Voice dictation is not supported in this browser. Please use Chrome or Edge.");
    return;
  }

  const micBtn = document.getElementById('chat-voice-btn');
  const chatInput = document.getElementById('chat-input');

  if (recognitionInstance) {
    recognitionInstance.stop();
    recognitionInstance = null;
    micBtn.classList.remove('listening');
    return;
  }

  recognitionInstance = new SpeechRecognition();
  recognitionInstance.continuous = false;
  recognitionInstance.interimResults = false;
  recognitionInstance.lang = 'en-IN';

  micBtn.classList.add('listening');

  recognitionInstance.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    chatInput.value += (chatInput.value ? ' ' : '') + transcript;
    micBtn.classList.remove('listening');
    recognitionInstance = null;
  };

  recognitionInstance.onerror = () => {
    micBtn.classList.remove('listening');
    recognitionInstance = null;
  };

  recognitionInstance.onend = () => {
    micBtn.classList.remove('listening');
    recognitionInstance = null;
  };

  recognitionInstance.start();
}

/* ────────────────────────────────────────────────────
   GYAAN WISDOM SECTION
──────────────────────────────────────────────────── */
function initGyaan() {
  renderFeaturedWisdom(GYAAN_LIBRARY[state.gyaan.featuredIndex]);
  renderGyaanGrid();
}

function renderFeaturedWisdom(w) {
  document.getElementById('gyaan-featured-devanagari').textContent = w.devanagari;
  document.getElementById('gyaan-featured-text').textContent = w.text;
  document.getElementById('gyaan-featured-translation').textContent = w.translation;
  document.getElementById('gyaan-featured-source').textContent = `— ${w.source} · ${w.tag}`;
  document.getElementById('gyaan-featured-reflection').textContent = `✦ ${w.reflection}`;
}

function refreshDailyWisdom() {
  state.gyaan.featuredIndex = (state.gyaan.featuredIndex + 1) % GYAAN_LIBRARY.length;
  const card = document.querySelector('.gyaan-featured');
  card.style.opacity = '0';
  setTimeout(() => {
    renderFeaturedWisdom(GYAAN_LIBRARY[state.gyaan.featuredIndex]);
    card.style.opacity = '1';
  }, 250);
}

function listenFeaturedWisdom() {
  const w = GYAAN_LIBRARY[state.gyaan.featuredIndex];
  speakText(encodeURIComponent(`${w.text}. ${w.translation}`));
}

function readAloudWisdom() {
  const verse = document.getElementById('home-daily-wisdom').textContent;
  speakText(encodeURIComponent(verse));
}

function filterGyaan(category, btn) {
  document.querySelectorAll('.gyaan-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.gyaan.filter = category;
  renderGyaanGrid();
}

function handleGyaanSearch(val) {
  state.gyaan.search = val.toLowerCase();
  renderGyaanGrid();
}

function renderGyaanGrid() {
  const grid = document.getElementById('gyaan-grid');
  if (!grid) return;

  let list = GYAAN_LIBRARY;
  if (state.gyaan.filter !== 'all') {
    list = list.filter(w => w.category === state.gyaan.filter);
  }
  if (state.gyaan.search) {
    list = list.filter(w =>
      w.text.toLowerCase().includes(state.gyaan.search) ||
      w.translation.toLowerCase().includes(state.gyaan.search) ||
      w.tag.toLowerCase().includes(state.gyaan.search) ||
      w.source.toLowerCase().includes(state.gyaan.search)
    );
  }

  if (list.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 48px; color: var(--ink-muted); font-style:italic;">No verses match your search.</div>`;
    return;
  }

  grid.innerHTML = list.map(w => `
    <div class="gyaan-card glass-card" onclick="selectGyaanCard(${w.id})">
      <div class="gyaan-card-top">
        <span class="gyaan-card-tag">${w.tag}</span>
        <button class="bubble-speak-btn" onclick="event.stopPropagation(); speakText('${encodeURIComponent(w.text)}')">🔊</button>
      </div>
      <div class="gyaan-card-devanagari">${w.devanagari.split('\n')[0]}</div>
      <div class="gyaan-card-text">${w.text}</div>
      <div class="gyaan-card-translation">${w.translation}</div>
      <div class="gyaan-card-footer">
        <span>${w.source}</span>
        <span style="font-weight:600;color:var(--sage-700);">Study &#8594;</span>
      </div>
    </div>
  `).join('');
}

function selectGyaanCard(id) {
  const foundIdx = GYAAN_LIBRARY.findIndex(w => w.id === id);
  if (foundIdx !== -1) {
    state.gyaan.featuredIndex = foundIdx;
    renderFeaturedWisdom(GYAAN_LIBRARY[foundIdx]);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }
}

function talkToManasAboutVerse() {
  const w = GYAAN_LIBRARY[state.gyaan.featuredIndex];
  showView('companion');
  document.getElementById('chat-input').value = `I was contemplating this verse from ${w.source}: "${w.text}". How can I apply its wisdom to my daily life?`;
  sendMessage();
}

/* ────────────────────────────────────────────────────
   REFLECTION JOURNAL LOGIC
──────────────────────────────────────────────────── */
function initJournal() {
  renderJournalList();
  if (state.journal.entries.length > 0 && !state.journal.activeEntryId) {
    openJournalEntry(state.journal.entries[0].id);
  }
}

function renderJournalList() {
  const listEl = document.getElementById('journal-entries-list');
  const countBadge = document.getElementById('journal-count-badge');
  if (!listEl) return;

  if (countBadge) countBadge.textContent = state.journal.entries.length;

  if (state.journal.entries.length === 0) {
    listEl.innerHTML = `<div style="text-align:center;padding:24px 12px;color:var(--ink-muted);font-size:0.85rem;font-style:italic;">Your private reflections will appear here.</div>`;
    return;
  }

  listEl.innerHTML = state.journal.entries.map(e => {
    const isActive = e.id === state.journal.activeEntryId;
    const dt = new Date(e.updatedAt || e.createdAt);
    const dateStr = dt.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
    const snippet = (e.body || '').replace(/[\n\r]+/g, ' ').slice(0, 50);

    return `
      <div class="journal-entry-card ${isActive ? 'active' : ''}" onclick="openJournalEntry(${e.id})">
        <div class="entry-card-title">${e.title || 'Untitled Reflection'}</div>
        <div class="entry-card-date">${dateStr}</div>
        <div class="entry-card-snippet">${snippet || 'No text yet...'}</div>
      </div>
    `;
  }).join('');
}

function newJournalEntry() {
  const prompt = JOURNAL_PROMPTS[state.journal.currentPromptIndex % JOURNAL_PROMPTS.length];
  const newEntry = {
    id: Date.now(),
    title: '',
    body: '',
    prompt: prompt,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  state.journal.entries.unshift(newEntry);
  state.journal.activeEntryId = newEntry.id;
  saveJournal();
  openJournalEntry(newEntry.id);
  renderJournalList();
}

function openJournalEntry(id) {
  const entry = state.journal.entries.find(e => e.id === id);
  if (!entry) return;

  state.journal.activeEntryId = id;

  document.getElementById('editor-empty').classList.add('hidden');
  document.getElementById('editor-active').classList.remove('hidden');

  document.getElementById('entry-title').value = entry.title || '';
  document.getElementById('entry-body').value = entry.body || '';

  const dateBadge = document.getElementById('entry-date-display');
  const dt = new Date(entry.createdAt);
  dateBadge.textContent = dt.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const promptText = document.getElementById('editor-prompt');
  promptText.textContent = entry.prompt || JOURNAL_PROMPTS[0];

  // Close previous AI reflection box
  document.getElementById('manas-reflection-box').classList.add('hidden');

  updateEditorCounts();
  renderJournalList();

  // Setup auto-save listener
  const titleInput = document.getElementById('entry-title');
  const bodyInput = document.getElementById('entry-body');
  titleInput.oninput = triggerJournalAutoSave;
  bodyInput.oninput = () => {
    updateEditorCounts();
    triggerJournalAutoSave();
  };
}

function cycleJournalPrompt() {
  state.journal.currentPromptIndex++;
  const newPrompt = JOURNAL_PROMPTS[state.journal.currentPromptIndex % JOURNAL_PROMPTS.length];
  const promptEl = document.getElementById('editor-prompt');
  if (promptEl) promptEl.textContent = newPrompt;

  const current = state.journal.entries.find(e => e.id === state.journal.activeEntryId);
  if (current) {
    current.prompt = newPrompt;
    saveJournal();
  }
}

function updateEditorCounts() {
  const body = document.getElementById('entry-body').value;
  const words = body.trim() ? body.trim().split(/\s+/).length : 0;
  const chars = body.length;

  document.getElementById('word-count').textContent = `${words} word${words !== 1 ? 's' : ''}`;
  document.getElementById('char-count').textContent = `${chars} characters`;
}

function triggerJournalAutoSave() {
  clearTimeout(state.journal.autoSaveTimer);
  const ind = document.getElementById('saved-indicator');
  ind.textContent = 'Unsaved changes...';
  ind.style.opacity = '1';

  state.journal.autoSaveTimer = setTimeout(() => {
    saveEntry();
  }, 1200);
}

function saveEntry() {
  const id = state.journal.activeEntryId;
  if (!id) return;

  const entry = state.journal.entries.find(e => e.id === id);
  if (!entry) return;

  entry.title = document.getElementById('entry-title').value.trim();
  entry.body = document.getElementById('entry-body').value;
  entry.updatedAt = new Date().toISOString();

  saveJournal();
  renderJournalList();

  const ind = document.getElementById('saved-indicator');
  ind.textContent = '✓ Saved privately';
  setTimeout(() => { ind.style.opacity = '0.6'; }, 1500);
}

function deleteEntry() {
  const id = state.journal.activeEntryId;
  if (!id) return;
  if (!confirm("Are you sure you want to delete this reflection?")) return;

  state.journal.entries = state.journal.entries.filter(e => e.id !== id);
  state.journal.activeEntryId = null;
  saveJournal();

  document.getElementById('editor-active').classList.add('hidden');
  document.getElementById('editor-empty').classList.remove('hidden');
  renderJournalList();
}

function saveJournal() {
  localStorage.setItem('laya_journal_entries', JSON.stringify(state.journal.entries));
}

async function askManasToReflectOnEntry() {
  const entry = state.journal.entries.find(e => e.id === state.journal.activeEntryId);
  if (!entry || !entry.body.trim()) {
    alert("Please write a few thoughts first so Manas has context to reflect upon.");
    return;
  }

  const box = document.getElementById('manas-reflection-box');
  const textEl = document.getElementById('manas-reflection-text');
  box.classList.remove('hidden');
  textEl.innerHTML = `<em>Manas is reading your reflection with loving attention...</em>`;

  const query = `Here is my private journal entry titled "${entry.title || 'Untitled'}":\n\n"${entry.body}"\n\nPlease offer a short, empathetic commentary from a Vedic/mindful perspective to help me deepen my awareness.`;

  try {
    let reply = "";
    if (state.ai.engine === 'gemini' && state.ai.geminiKey) {
      reply = await queryGeminiApi(query);
    } else {
      reply = generateJournalManasReflection(entry.body);
    }
    textEl.innerHTML = reply.replace(/\n/g, '<br/>');
  } catch (e) {
    textEl.innerHTML = generateJournalPriyaReflection(entry.body).replace(/\n/g, '<br/>');
  }
}

function generateJournalManasReflection(text) {
  return `Thank you for holding mirror to your inner world. In reading your words, I sense a deep yearning for alignment and truth.\n\nIn the tradition of Swadhyaya (self-study), writing down your thoughts acts as an alchemy that turns unexamined emotion into golden wisdom. Notice how releasing these words onto the page already gives you a small vantage point of freedom.\n\nTake one conscious breath and thank yourself for this honesty. You are listening to your own soul.`;
}

function closeManasReflection() {
  document.getElementById('manas-reflection-box').classList.add('hidden');
}

/* ────────────────────────────────────────────────────
   PRANAYAMA STUDIO LOGIC
──────────────────────────────────────────────────── */
const PRANA_MODES = {
  box: {
    name: 'Box Breathing (Sama Vritti)',
    sequence: [
      { phase: 'Inhale', class: 'expand', time: 4, sub: 'Inhale slowly through the nose' },
      { phase: 'Hold', class: 'hold', time: 4, sub: 'Hold with softness in chest' },
      { phase: 'Exhale', class: 'contract', time: 4, sub: 'Exhale smoothly through nose or mouth' },
      { phase: 'Hold', class: 'contract', time: 4, sub: 'Rest empty in stillness' }
    ]
  },
  relax: {
    name: '4-7-8 Deep Rest',
    sequence: [
      { phase: 'Inhale', class: 'expand', time: 4, sub: 'Breathe in quietly through the nose' },
      { phase: 'Hold', class: 'hold', time: 7, sub: 'Hold the breath effortlessly' },
      { phase: 'Exhale', class: 'contract', time: 8, sub: 'Make a gentle whoosh sound out' }
    ]
  },
  nadi: {
    name: 'Nadi Shodhana Cadence',
    sequence: [
      { phase: 'Left Inhale', class: 'expand', time: 4, sub: 'Inhale through left nostril' },
      { phase: 'Hold Both', class: 'hold', time: 4, sub: 'Hold gently at brow center' },
      { phase: 'Right Exhale', class: 'contract', time: 6, sub: 'Exhale through right nostril' },
      { phase: 'Right Inhale', class: 'expand', time: 4, sub: 'Inhale through right nostril' },
      { phase: 'Hold Both', class: 'hold', time: 4, sub: 'Hold gently at brow center' },
      { phase: 'Left Exhale', class: 'contract', time: 6, sub: 'Exhale through left nostril' }
    ]
  }
};

function initPranayama() {
  updatePranayamaDisplay();
}

function setPranaMode(modeKey, btn) {
  document.querySelectorAll('.prana-mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  if (state.pranayama.isActive) {
    togglePranaSession(); // stop active
  }

  state.pranayama.mode = modeKey;
  updatePranayamaDisplay();
}

function updatePranayamaDisplay() {
  const modeData = PRANA_MODES[state.pranayama.mode];
  const firstStep = modeData.sequence[0];
  document.getElementById('mandala-phase').textContent = firstStep.phase;
  document.getElementById('mandala-counter').textContent = firstStep.time;
  document.getElementById('mandala-sub').textContent = firstStep.sub;
}

function togglePranaSession() {
  const btn = document.getElementById('prana-session-toggle');
  const core = document.getElementById('mandala-core');
  const phaseEl = document.getElementById('mandala-phase');
  const countEl = document.getElementById('mandala-counter');
  const subEl = document.getElementById('mandala-sub');
  const cyclesEl = document.getElementById('prana-cycles-count');

  if (state.pranayama.isActive) {
    clearInterval(state.pranayama.timer);
    state.pranayama.isActive = false;
    btn.textContent = 'Start Breathing Session';
    core.className = 'mandala-core';
    updatePranayamaDisplay();
    return;
  }

  state.pranayama.isActive = true;
  btn.textContent = 'Pause Session';

  const mode = PRANA_MODES[state.pranayama.mode];
  let stepIdx = 0;
  let remaining = mode.sequence[0].time;

  const tick = () => {
    const cur = mode.sequence[stepIdx];
    core.className = `mandala-core ${cur.class}`;
    phaseEl.textContent = cur.phase;
    countEl.textContent = remaining;
    subEl.textContent = cur.sub;

    remaining--;
    if (remaining < 0) {
      stepIdx++;
      if (stepIdx >= mode.sequence.length) {
        stepIdx = 0;
        state.pranayama.cyclesCompleted++;
        if (cyclesEl) cyclesEl.textContent = state.pranayama.cyclesCompleted;
      }
      remaining = mode.sequence[stepIdx].time;
    }
  };

  tick();
  state.pranayama.timer = setInterval(tick, 1000);
}

/* ────────────────────────────────────────────────────
   AMBIENT AUDIO UI CONTROLS
──────────────────────────────────────────────────── */
function toggleAmbientSound() {
  const selector = document.getElementById('ambient-selector');
  selector.classList.toggle('open');
}

function setAmbientSound(type, event) {
  if (event) event.stopPropagation();
  const text = document.getElementById('ambient-text');
  const wave = document.getElementById('ambient-wave');
  const selector = document.getElementById('ambient-selector');

  document.querySelectorAll('.ambient-selector button').forEach(b => b.classList.remove('active'));
  if (event && event.target) event.target.classList.add('active');

  if (type === 'off') {
    ambientAudio.stopAll();
    text.textContent = 'Sound: Silence';
    wave.classList.remove('playing');
  } else if (type === 'tanpura') {
    ambientAudio.playTanpura();
    text.textContent = 'Sound: Tanpura Drone';
    wave.classList.add('playing');
  } else if (type === 'bowl') {
    ambientAudio.playSingingBowl();
    text.textContent = 'Sound: Singing Bowl';
    wave.classList.add('playing');
  } else if (type === 'rain') {
    ambientAudio.playTempleRain();
    text.textContent = 'Sound: Temple Rain';
    wave.classList.add('playing');
  } else if (type === 'om') {
    ambientAudio.playOmResonance();
    text.textContent = 'Sound: Om Resonance';
    wave.classList.add('playing');
  }

  selector.classList.remove('open');
  const homeStatus = document.getElementById('status-ambient-text');
  if (homeStatus) homeStatus.textContent = `Audio: ${text.textContent.replace('Sound: ', '')}`;
}

/* ────────────────────────────────────────────────────
   AI SETTINGS MODAL
──────────────────────────────────────────────────── */
function openAiSettingsModal() {
  const modal = document.getElementById('ai-modal');
  modal.style.display = 'flex';

  // Populate values
  const radios = document.getElementsByName('ai-engine');
  radios.forEach(r => {
    r.checked = (r.value === state.ai.engine);
  });
  toggleEngineType(state.ai.engine);

  document.getElementById('gemini-api-key').value = state.ai.geminiKey;
  document.getElementById('voice-speed-select').value = String(state.ai.voiceSpeed);
}

function closeAiSettingsModal() {
  document.getElementById('ai-modal').style.display = 'none';
}

function handleModalBackdropClick(e) {
  if (e.target.id === 'ai-modal') closeAiSettingsModal();
}

function toggleEngineType(type) {
  const group = document.getElementById('gemini-key-group');
  if (type === 'gemini') {
    group.style.display = 'block';
  } else {
    group.style.display = 'none';
  }
}

function toggleKeyVisibility() {
  const input = document.getElementById('gemini-api-key');
  input.type = (input.type === 'password') ? 'text' : 'password';
}

function updateVoiceSpeed(val) {
  state.ai.voiceSpeed = parseFloat(val);
}

function saveAiSettings() {
  const selectedEngine = document.querySelector('input[name="ai-engine"]:checked').value;
  const key = document.getElementById('gemini-api-key').value.trim();
  const speed = parseFloat(document.getElementById('voice-speed-select').value);

  state.ai.engine = selectedEngine;
  state.ai.geminiKey = key;
  state.ai.voiceSpeed = speed;

  localStorage.setItem('laya_ai_engine', selectedEngine);
  localStorage.setItem('laya_gemini_key', key);
  localStorage.setItem('laya_voice_speed', String(speed));

  const pill = document.getElementById('settings-status-pill');
  if (pill) pill.textContent = selectedEngine === 'gemini' && key ? 'Gemini Active' : 'Built-in AI';

  const tag = document.getElementById('companion-ai-tag');
  if (tag) tag.textContent = selectedEngine === 'gemini' && key ? 'Gemini 1.5' : 'Built-in AI';

  closeAiSettingsModal();
  alert("AI settings saved successfully!");
}

async function testAiConnection() {
  const selectedEngine = document.querySelector('input[name="ai-engine"]:checked').value;
  if (selectedEngine === 'builtin') {
    alert("Built-in contemplative reasoning engine is ready and working completely offline!");
    return;
  }
  const key = document.getElementById('gemini-api-key').value.trim();
  if (!key) {
    alert("Please enter a Gemini API Key to test.");
    return;
  }
  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: 'Respond with: "Namaste! Gemini connection is active."' }] }] })
    });
    if (res.ok) {
      const data = await res.json();
      const txt = data.candidates?.[0]?.content?.parts?.[0]?.text;
      alert(`Success! ${txt}`);
    } else {
      alert(`Connection failed (HTTP ${res.status}). Please verify your API key.`);
    }
  } catch (err) {
    alert(`Error connecting to Gemini API: ${err.message}`);
  }
}

/* ────────────────────────────────────────────────────
   AUTHENTICATION & PROFILE MANAGEMENT
──────────────────────────────────────────────────── */

function handleUserNavClick() {
  if (state.user && state.user.isLoggedIn) {
    showView('profile');
  } else {
    showView('auth');
  }
}

function updateNavUserDisplay() {
  const avatarEl = document.getElementById('nav-user-avatar');
  const nameEl = document.getElementById('nav-user-name');
  const mobileLink = document.getElementById('mobile-user-link');

  if (state.user && state.user.isLoggedIn) {
    if (avatarEl) avatarEl.textContent = state.user.avatar || '🪷';
    if (nameEl) nameEl.textContent = state.user.name || 'Seeker';
    if (mobileLink) mobileLink.textContent = `Profile: ${state.user.name || 'Seeker'}`;
  } else {
    if (avatarEl) avatarEl.textContent = '👤';
    if (nameEl) nameEl.textContent = 'Sign In';
    if (mobileLink) mobileLink.textContent = 'Sign In / Register';
  }
}

function initAuth() {
  switchAuthTab('login');
  const emailInput = document.getElementById('login-email');
  if (emailInput && !emailInput.value && state.user?.email) {
    emailInput.value = state.user.email;
  }
}

function switchAuthTab(tab) {
  const loginBtn = document.getElementById('tab-login-btn');
  const regBtn = document.getElementById('tab-register-btn');
  const loginForm = document.getElementById('form-login');
  const regForm = document.getElementById('form-register');

  if (tab === 'login') {
    loginBtn.classList.add('active');
    regBtn.classList.remove('active');
    loginForm.classList.remove('hidden');
    regForm.classList.add('hidden');
  } else {
    loginBtn.classList.remove('active');
    regBtn.classList.add('active');
    loginForm.classList.add('hidden');
    regForm.classList.remove('hidden');
  }
}

function togglePasswordVisibility(fieldId) {
  const input = document.getElementById(fieldId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

function demoPasswordHint() {
  alert("In LAYA, your sanctuary is open. You can sign in with any email and password, or use the 'Continue as Guest Seeker' button for instant entry!");
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  // Look for existing registered user or authenticate current
  const foundUser = state.registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (foundUser) {
    state.user = { ...foundUser, isLoggedIn: true };
  } else {
    // Generate name from email
    const inferredName = email.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = inferredName.charAt(0).toUpperCase() + inferredName.slice(1);
    state.user = {
      ...defaultUser,
      name: state.user?.name && state.user.name !== 'Aarav' ? state.user.name : formattedName,
      email: email,
      isLoggedIn: true
    };
  }

  localStorage.setItem('laya_current_user', JSON.stringify(state.user));
  updateNavUserDisplay();
  alert(`Welcome back to your sanctuary, ${state.user.name}.`);
  showView('profile');
}

function handleRegisterSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const sankalpa = document.getElementById('reg-sankalpa').value;

  if (!name || !email || !password) {
    alert("Please complete all fields to establish your sanctuary profile.");
    return;
  }

  const newUser = {
    name: name,
    email: email,
    password: password,
    sankalpa: sankalpa,
    avatar: '🪷',
    title: 'Seeker of Truth',
    dosha: 'Tridoshic Harmony',
    defaultSound: 'tanpura',
    sacredHour: 'Sandhya (Twilight Sunset · 6:30 PM)',
    manasTone: 'meditative',
    isLoggedIn: true,
    createdAt: new Date().toISOString()
  };

  state.registeredUsers.push(newUser);
  localStorage.setItem('laya_registered_users', JSON.stringify(state.registeredUsers));

  state.user = newUser;
  localStorage.setItem('laya_current_user', JSON.stringify(state.user));

  updateNavUserDisplay();
  alert(`Namaste ${name}! Your sacred sanctuary account has been created.`);
  showView('profile');
}

function handleGuestLogin() {
  state.user = {
    ...defaultUser,
    name: 'Guest Seeker',
    email: 'guest@laya.sanctuary',
    avatar: '🪷',
    isLoggedIn: true
  };
  localStorage.setItem('laya_current_user', JSON.stringify(state.user));
  updateNavUserDisplay();
  showView('profile');
}

function handleLogout() {
  if (confirm("Would you like to step out of your sanctuary session? Your records will remain saved on this device.")) {
    state.user.isLoggedIn = false;
    localStorage.setItem('laya_current_user', JSON.stringify(state.user));
    updateNavUserDisplay();
    showView('auth');
  }
}

/* ────────────────────────────────────────────────────
   CUSTOMISABLE PROFILE CONTROLS
──────────────────────────────────────────────────── */

function initProfile() {
  if (!state.user || !state.user.isLoggedIn) {
    showView('auth');
    return;
  }

  // Populate hero card
  const avatarIcon = document.getElementById('profile-avatar-icon');
  const nameDisplay = document.getElementById('profile-name-display');
  const emailDisplay = document.getElementById('profile-email-display');
  const doshaBadge = document.getElementById('profile-dosha-badge');
  const sankalpaDisplay = document.getElementById('profile-sankalpa-display');

  if (avatarIcon) avatarIcon.textContent = state.user.avatar || '🪷';
  if (nameDisplay) nameDisplay.textContent = state.user.name || 'Seeker';
  if (emailDisplay) emailDisplay.textContent = state.user.email || 'seeker@laya.sanctuary';
  if (doshaBadge) doshaBadge.textContent = state.user.dosha || 'Tridoshic Harmonic';
  if (sankalpaDisplay) sankalpaDisplay.textContent = state.user.sankalpa || 'Walking through life with gentle presence.';

  // Populate editable form inputs
  const editName = document.getElementById('edit-profile-name');
  const editTitle = document.getElementById('edit-profile-title');
  const editSankalpa = document.getElementById('edit-profile-sankalpa');
  const editSound = document.getElementById('edit-default-sound');
  const editHour = document.getElementById('edit-sacred-hour');
  const editTone = document.getElementById('edit-manas-tone');

  if (editName) editName.value = state.user.name || '';
  if (editTitle) editTitle.value = state.user.title || '';
  if (editSankalpa) editSankalpa.value = state.user.sankalpa || '';
  if (editSound) editSound.value = state.user.defaultSound || 'tanpura';
  if (editHour) editHour.value = state.user.sacredHour || 'Sandhya (Twilight Sunset · 6:30 PM)';
  if (editTone) editTone.value = state.user.manasTone || 'meditative';

  // Dosha radio selection
  const doshaRadios = document.getElementsByName('profile-dosha');
  doshaRadios.forEach(radio => {
    radio.checked = (radio.value === state.user.dosha);
  });

  // Calculate & render journey statistics
  renderProfileStats();
  renderAvatarSelectionGrid();
}

function calculateStreak() {
  if (!state.checkin.history || state.checkin.history.length === 0) return 0;

  const dates = state.checkin.history
    .map(h => new Date(h.timestamp).toDateString())
    .filter((v, i, a) => a.indexOf(v) === i); // unique dates

  let streak = 0;
  let checkDate = new Date();

  // If user hasn't checked in today, check if they checked in yesterday
  const todayStr = checkDate.toDateString();
  const hasToday = dates.includes(todayStr);

  if (!hasToday) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (dates.includes(checkDate.toDateString())) {
    streak++;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  return Math.max(streak, hasToday ? 1 : 0);
}

function renderProfileStats() {
  const streakEl = document.getElementById('stat-mindful-streak');
  const checkinsEl = document.getElementById('stat-total-checkins');
  const reflectionsEl = document.getElementById('stat-total-reflections');
  const pranaEl = document.getElementById('stat-prana-cycles');

  const streakDays = calculateStreak();
  if (streakEl) streakEl.textContent = `${streakDays} ${streakDays === 1 ? 'Day' : 'Days'}`;
  if (checkinsEl) checkinsEl.textContent = state.checkin.history.length;
  if (reflectionsEl) reflectionsEl.textContent = state.journal.entries.length;
  if (pranaEl) pranaEl.textContent = state.pranayama.cyclesCompleted;
}

function saveProfileChanges() {
  const nameInput = document.getElementById('edit-profile-name').value.trim();
  const titleInput = document.getElementById('edit-profile-title').value.trim();
  const sankalpaInput = document.getElementById('edit-profile-sankalpa').value.trim();
  const soundSelect = document.getElementById('edit-default-sound').value;
  const hourSelect = document.getElementById('edit-sacred-hour').value;
  const toneSelect = document.getElementById('edit-manas-tone').value;

  const selectedDoshaRadio = document.querySelector('input[name="profile-dosha"]:checked');
  const doshaValue = selectedDoshaRadio ? selectedDoshaRadio.value : (state.user.dosha || 'Tridoshic Harmony');

  if (!nameInput) {
    alert("Seeker name cannot be empty.");
    return;
  }

  state.user = {
    ...state.user,
    name: nameInput,
    title: titleInput,
    sankalpa: sankalpaInput,
    dosha: doshaValue,
    defaultSound: soundSelect,
    sacredHour: hourSelect,
    manasTone: toneSelect,
    isLoggedIn: true
  };

  // Sync to registeredUsers array if present
  const userIdx = state.registeredUsers.findIndex(u => u.email === state.user.email);
  if (userIdx !== -1) {
    state.registeredUsers[userIdx] = { ...state.registeredUsers[userIdx], ...state.user };
    localStorage.setItem('laya_registered_users', JSON.stringify(state.registeredUsers));
  }

  localStorage.setItem('laya_current_user', JSON.stringify(state.user));

  // Update UI displays
  updateNavUserDisplay();
  initProfile();

  const statusText = document.getElementById('profile-save-status');
  if (statusText) {
    statusText.textContent = "✓ All sanctuary preferences saved!";
    statusText.style.color = "var(--sage-800)";
    setTimeout(() => {
      statusText.textContent = "All changes saved locally.";
      statusText.style.color = "var(--sage-700)";
    }, 2500);
  }
}

/* ────────────────────────────────────────────────────
   SACRED AVATAR ICON PICKER
──────────────────────────────────────────────────── */

function openAvatarModal() {
  renderAvatarSelectionGrid();
  document.getElementById('avatar-modal').style.display = 'flex';
}

function closeAvatarModal() {
  document.getElementById('avatar-modal').style.display = 'none';
}

function handleAvatarBackdropClick(event) {
  if (event.target.id === 'avatar-modal') closeAvatarModal();
}

function renderAvatarSelectionGrid() {
  const grid = document.getElementById('avatar-selection-grid');
  if (!grid) return;

  const currentAvatar = state.user?.avatar || '🪷';

  grid.innerHTML = SACRED_AVATARS.map(item => `
    <button class="avatar-option-btn ${currentAvatar === item.icon ? 'selected' : ''}" 
            onclick="selectAvatar('${item.icon}')" 
            title="${item.name}: ${item.meaning}">
      <span>${item.icon}</span>
    </button>
  `).join('');
}

function selectAvatar(icon) {
  state.user.avatar = icon;
  localStorage.setItem('laya_current_user', JSON.stringify(state.user));

  const profileAvatar = document.getElementById('profile-avatar-icon');
  if (profileAvatar) profileAvatar.textContent = icon;

  updateNavUserDisplay();
  renderAvatarSelectionGrid();
  closeAvatarModal();
}

function applyCustomAvatar() {
  const input = document.getElementById('custom-avatar-input');
  const val = input.value.trim();
  if (!val) {
    alert("Please enter an emoji or letter first.");
    return;
  }
  selectAvatar(val);
  input.value = '';
}

/* ────────────────────────────────────────────────────
   DATA SOVEREIGNTY & BACKUP EXPORT
──────────────────────────────────────────────────── */

function exportSanctuaryData() {
  const exportPayload = {
    exportedAt: new Date().toISOString(),
    seeker: state.user,
    checkinHistory: state.checkin.history,
    journalReflections: state.journal.entries,
    chatConversation: state.chat.messages,
    aiConfiguration: state.ai
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `laya-sanctuary-${state.user.name || 'seeker'}-${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function clearSanctuaryData() {
  if (confirm("Are you sure you want to erase all local sanctuary check-ins and journal entries? This action cannot be undone.")) {
    state.checkin.history = [];
    state.journal.entries = [];
    state.chat.messages = [];
    localStorage.removeItem('laya_checkin_history');
    localStorage.removeItem('laya_journal_entries');
    localStorage.removeItem('laya_chat_history');
    alert("Your local sanctuary history has been refreshed.");
    initProfile();
    initHome();
  }
}

/* ────────────────────────────────────────────────────
   THEME CONTROLLER: BLUE LOTUS (NILOTPALA) & LAVENDER
──────────────────────────────────────────────────── */

function initTheme() {
  const savedTheme = localStorage.getItem('laya_theme');
  // Default to 'dark' (Nilotpala & Lavender) per user request, or preserve light if user chose it
  if (savedTheme === 'light') {
    applyTheme('light', false);
  } else {
    applyTheme('dark', false);
  }
}

function applyTheme(theme, notify = true) {
  const isDark = theme === 'dark';
  const body = document.body;
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');
  const mobileThemeBtn = document.getElementById('mobile-theme-btn');

  if (isDark) {
    body.classList.add('dark-theme');
    if (themeIcon) themeIcon.textContent = '☀️';
    if (themeLabel) themeLabel.textContent = 'Light Mode';
    if (toggleBtn) {
      toggleBtn.classList.add('is-dark');
      toggleBtn.title = 'Switch to Dark Mode';
    }
    if (mobileThemeBtn) mobileThemeBtn.textContent = '☀️ Switch to Light Mode';
    localStorage.setItem('laya_theme', 'dark');
    if (notify) showThemeToast('🪷 Nilotpala Sanctuary active · Blue Lotus & Lavender dark theme');
  } else {
    body.classList.remove('dark-theme');
    if (themeIcon) themeIcon.textContent = '🪷';
    if (themeLabel) themeLabel.textContent = 'Nilotpala';
    if (toggleBtn) {
      toggleBtn.classList.remove('is-dark');
      toggleBtn.title = 'Switch to Blue Lotus & Lavender dark theme';
    }
    if (mobileThemeBtn) mobileThemeBtn.textContent = '🪷 Blue Lotus & Lavender Theme';
    localStorage.setItem('laya_theme', 'light');
    if (notify) showThemeToast('🌿 Surya Sanctuary active · Antique Sage & Steel light theme');
  }
}

function toggleTheme() {
  const isDark = document.body.classList.contains('dark-theme');
  applyTheme(isDark ? 'light' : 'dark', true);
}

function showThemeToast(msg) {
  let toast = document.getElementById('laya-theme-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'laya-theme-toast';
    toast.className = 'theme-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(window._themeToastTimer);
  window._themeToastTimer = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2800);
}

/* ────────────────────────────────────────────────────
   DOCUMENT INITIALIZATION
──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateNavUserDisplay();
  initHome();
  showView('home');

  // Scroll listener for nav styling
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });
});
