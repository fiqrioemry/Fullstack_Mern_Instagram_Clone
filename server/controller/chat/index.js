const cassandra = require('../../cassandra');

async function sendMessage(req, res) {
  const { sender_id, receiver_id, content } = req.body;
  const chat_id =
    sender_id < receiver_id
      ? `${sender_id}_${receiver_id}`
      : `${receiver_id}_${sender_id}`;
  const timestamp = new Date();

  try {
    await cassandra.execute(
      'INSERT INTO messages (chat_id, sender_id, receiver_id, content, timestamp) VALUES (?, ?, ?, ?, ?)',
      [chat_id, sender_id, receiver_id, content, timestamp],
      { prepare: true },
    );
    res.json({ success: true, message: 'Message is send', chat_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Fail saving message' });
  }
}

async function getMessage(req, res) {
  const { chat_id } = req.params;

  try {
    const result = await cassandra.execute(
      'SELECT * FROM messages WHERE chat_id = ? ORDER BY timestamp DESC',
      [chat_id],
      { prepare: true },
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed retrive a message' });
  }
}

module.exports = { sendMessage, getMessage };
