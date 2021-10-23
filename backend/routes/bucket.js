const express = require("express")
const router = express.Router();
const multer = require("multer")
const fs = require('fs')
const {promisify} = require('util')


//multer se uporablja za nalaganje filov
/*
const unlinkAsync = fs.unlink(filesPath,()=>{
  if(err) throw err;
});
*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/files");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "_" + file.originalname;
    cb(null, name);
  }
})

//models
const Bucket = require("../models/bucket")
const Location = require("../models/location")
const File = require("../models/file")

router.post("/add-bucket", (req, res, next) => {
  const post = new Bucket({
    name: req.body.name,
    location: req.body.location
  });
  //pridobimo ID ki ga potem vrnemo da lahko posodobimo array
  post.save().then(result => {
    res.status(201).json({
      message: 'Bucket added successfully',
      bucketID: result._id
    });
  })
    .catch(error => {
      res.status(500).json({
        message: "Saving bucket failed",
        error: error
      })
    })
});

router.get("/get-buckets", (req, res, next) => {
  Bucket.find().populate('location').then(buckets => {
    res.status(200).json(buckets);
  })
    .catch(error => {
      res.status(500).json({
        message: "Getting buckets failed",
        error: error
      })
    })
});
router.get("/get-locations", (req, res, next) => {
  Location.find().then(locations => {
    res.status(200).json(locations);
  })
    .catch(error => {
      res.status(500).json({
        message: "Getting locations failed",
        error: error
      })
    })
});
router.delete("/delete-bucket/:id", (req, res, next) => {

  File.find({bucket: req.params.id}).then(buckets => {
    buckets.forEach(bucket => {
      if (fs.existsSync(bucket.file_path)) {
        fs.unlinkSync(bucket.file_path);
      }
    })
    File.deleteMany({bucket: req.params.id}).then(response => {
      Bucket.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json("test");
      })
        .catch(error => {
          res.status(500).json({
            message: "Deleting bucket failed",
            error: error
          })
        })
    })
      .catch(error => {
        res.status(500).json({
          message: "Deleting files failed",
          error: error
        })
      })
  })
    .catch(error => {
      res.status(500).json({
        message: "Failed to delete files",
        error: error
      })
    })


});

router.get("/get-files/:id", (req, res, next) => {
  File.find({bucket: req.params.id}).then(buckets => {
    res.status(200).json(buckets);
  })
    .catch(error => {
      res.status(500).json({
        message: "Get files failed",
        error: error
      })
    })
});

router.get("/get-files-size/:id", (req, res, next) => {
  File.find({bucket: req.params.id}).select('size').then(buckets => {
    let bu = 0;
    if (buckets.length > 0) {
      bu = buckets.map(item => item.size).reduce((prev, next) => prev + next);
    }
    res.status(200).json(bu);
  })
    .catch(error => {
      res.status(500).json({
        message: "Getting files size failed",
        error: error
      })
    })
});
router.delete("/delete-files/:id", (req, res, next) => {
  File.find({bucket: req.params.id}).then(buckets => {
    buckets.forEach(bucket => {
      if (fs.existsSync(bucket.file_path)) {
        fs.unlinkSync(bucket.file_path);
      }
    })
    File.deleteMany({bucket: req.params.id}).then(response => {
      res.status(200).json(response);
    })
      .catch(error => {
        res.status(500).json({
          message: "Deleting files failed",
          error: error
        })
      })
  })
    .catch(error => {
      res.status(500).json({
        message: "Failed to delete files",
        error: error
      })
    })
});


router.post("/add-file", multer({storage: storage}).single("file"), (req, res, next) => {
  let file_path = "backend/files/" + req.file.filename
  const post = new File({
    name: req.body.name,
    last_modified: req.body.last_modified,
    bucket: req.body.id_bucket,
    size: req.body.size,
    file_path: file_path
  });
  //pridobimo ID ki ga potem vrnemo da lahko posodobimo array
  post.save().then(result => {
    res.status(201).json({
      message: 'File added successfully',
      id_file: result._id,
      file_path: file_path
    });
  })
    .catch(error => {
      res.status(500).json({
        message: "Save file failed",
        error: error
      })
    })

});

module.exports = router;
