const identify = "Sunsire (Node.js Discord Library)";
const rest_version = "10";

const allowed_sizes = [16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
const allowed_formats = ["webp", "png", "jpg", "jpeg", "gif"];

const Opcodes = { 
   dispatch: 0, 
   heartbeat: 1, 
   identify: 2, 
   statusUpdate: 3, 
   voiceStateUpdate: 4, 
   voiceGuildPing: 5, 
   resume: 6, 
   reconnect: 7, 
   requestGuildMembers: 8, 
   invalidSession: 9, 
   hello: 10, 
   hearthbeatAck: 11 
}


module.exports = {
	identify,
	rest_version,
	allowed_sizes,
	allowed_formats,
	Opcodes
}