import service from "../common/request"
let api = {
    getCurTask() {
        return service.get("/api/Andon/GetCurTask");
    },
    getTaskUser(taskId) {
        return service.get("/api/Andon/GetTaskUser?taskId=" + taskId);
    },
};
export default api;