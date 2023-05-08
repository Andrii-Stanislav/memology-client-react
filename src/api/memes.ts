import ApiService from "./ApiService";

export const getAllMemes = () => ApiService.get("/memes");
