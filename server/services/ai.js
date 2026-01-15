// This would be where we call Nexos.ai and ElevenLabs
// For now, it contains the logic to categorize severity based on keywords

class AIService {
    static analyzeText(text) {
        const lower = text.toLowerCase();
        let severity = 'LOW';
        let category = 'General Inquiry';

        if (lower.includes('chest pain') || lower.includes('heart attack') || lower.includes('blood') || lower.includes('unconscious')) {
            severity = 'CRITICAL';
            category = 'Medical Emergency';
        } else if (lower.includes('fire') || lower.includes('smoke') || lower.includes('explosion')) {
            severity = 'HIGH';
            category = 'Fire Hazard';
        } else if (lower.includes('stuck') || lower.includes('crash') || lower.includes('accident')) {
            severity = 'MEDIUM';
            category = 'Traffic/Rescue';
        }

        return { severity, category, summary: text };
    }
}

module.exports = AIService;
