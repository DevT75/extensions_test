export default class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getJob() {
        const response = await fetch(`${this.baseUrl}/mobile/job`);
        if (!response.ok) throw new Error('Failed to fetch job');
        return response.json();
    }

    async completeJob(jobId, result) {
        const response = await fetch(`${this.baseUrl}/mobile/job/${jobId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ result, metadata: {} }),
        });
        if (!response.ok) throw new Error('Failed to complete job');
    }

    async reportError(jobId, error, metadata = {}) {
        const response = await fetch(`${this.baseUrl}/mobile/job/${jobId}/error`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: JSON.stringify({ error, metadata }), metadata: {} }),
        });
        if (!response.ok) throw new Error('Failed to report error');
    }
}