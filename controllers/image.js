const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const stub = ClarifaiStub.grpc();

// This will be used by every Clarifai endpoint call
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + "098a6c0c7985444d84e1e6cd7240579b");

// Your PAT (Personal Access Token) can be found in the portal under Authentification
// const PAT = '098a6c0c7985444d84e1e6cd7240579b';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'dragon_god';
const APP_ID = '325dd565c1f64cfba01c28f10e0ba54f';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
// const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';

const handleApiCall = (req, res) => {
  const { IMAGE_URL } = req.body

  stub.PostModelOutputs(
    {
        user_app_id: {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        model_id: MODEL_ID,
        // version_id: "6dc7e46bc9124c5c8824be4822abe105",  // This is optional. Defaults to the latest model version
        inputs: [
            { data: { image: { url: IMAGE_URL } } }
        ]
    },
    metadata,
    (err, response) => {
        if (err) {
            // throw new Error(err);
            res.status(500).json({ error: "An error occurred while calling the API." });
            return;
        }

        if (response.status.code !== 10000) {
            // throw new Error("Post model outputs failed, status: " + response.status.description);
            res.status(500).json({ error: "An error occurred while calling the API." });
            return;
        }

        // Since we have one input, one output will exist here.
        const output = response.outputs[0];

        for (const concept of output.data.concepts) {
            console.log(concept.name + " " + concept.value);
        }
        res.json(output.data.regions[0].region_info.bounding_box)
    }
  );
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0].entries))
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}