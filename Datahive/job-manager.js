export default class JobManager {
    constructor(apiClient, jobExecutor, intervalMs) {
        this.apiClient = apiClient;
        this.jobExecutor = jobExecutor;
        this.intervalMs = intervalMs;
        this.isRunning = false;
        this.intervalId = null;
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.runJobCycle();
        this.intervalId = setInterval(() => this.runJobCycle(), this.intervalMs);
    }

    stop() {
        this.isRunning = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    getStatus() {
        return this.isRunning ? 'Running' : 'Stopped';
    }

    async runJobCycle() {
        try {
            const job = await this.apiClient.getJob();
            if (!job) return;

            const result = await this.jobExecutor.executeJob(job);
            await this.apiClient.completeJob(job.id, result);
        } catch (error) {
            console.error('Job execution failed:', error);
            if (job) {
                await this.apiClient.reportError(job.id, error.message);
            }
        }
    }
}