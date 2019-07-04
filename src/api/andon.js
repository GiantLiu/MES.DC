import service from "../common/request"
let api = {
    getCurTask() {
        return service.get("/api/Andon/GetCurTask");
    },
    getTaskUser(taskId) {
        return service.get("/api/Andon/GetTaskUser?taskId=" + taskId);
    },
    getAndon(model) {
        return service.post("/api/Andon/GetAndon", model);
    }
};
export default api;