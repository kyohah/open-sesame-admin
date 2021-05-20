const { RekognitionClient, IndexFacesCommand } = require("@aws-sdk/client-rekognition");

const client = new RekognitionClient();

module.exports = async function App(context) {
  if (context.event.isImage || context.event.isVideo || context.event.isAudio) {
    const buffer = await context.getMessageContent();
    const params = {
      CollectionId: "myphotos",
      Image: {
        Bytes: buffer
      }
    };
    const command = new IndexFacesCommand(params);

    await client.send(command).then((data) => {
      const text = data.FaceRecords? "顔が見つかりました" : "見つかりませんでした"
      context.sendText(text);
    })
  }
}
