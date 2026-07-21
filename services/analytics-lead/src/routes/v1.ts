import { Router } from 'express';
import { postLead } from '../controllers/lead.controller';
import { postChatMessage } from '../controllers/chat.controller';
import { getHealth } from '../controllers/health.controller';

const router = Router();

router.get('/health', getHealth);
router.post('/leads', postLead);
router.post('/chat/message', postChatMessage);

export default router;
