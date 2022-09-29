var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const uid = require('uid2')
const bcrypt = require('bcrypt')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user/new', (req, res) => {

  const hashPassword = bcrypt.hashSync(req.body.password, 10)

  async function main() {
    // Connect the client
    await prisma.$connect()
    const user = await prisma.user.create({
      data: {
        name: req.body.username,
        email: req.body.email,
        token: uid(32),
        password: hashPassword,
        createdAt: new Date()
      },
    })
    res.json({user: user})
  }

  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
  
})

router.get('/all-article', async (req, res) => {
  const posts = await prisma.post.findMany()
  res.json({posts: posts})
})

router.post('/article/new', async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      token: req.headers.token
    },
  })
  let message = 'ok'
  if(!user){
    message = 'User not found'
  }

  const post = await prisma.post.create({
    data:{
      title: req.body.title,
      body: req.body.content,
      author:{
        connect:{
          id: user.id
        }
      },
      category:{
        connect:{
          id: category.id
        }
      }
    }
  })

  if(!post){
    message = 'Something wrong'
  }

res.json({message: message, post: post})

})

router.post('/article/:id/comment/new', async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      token: req.headers.token
    },
  })
  let message = 'ok'
  if (!user) {
    message = 'User not found'
  }

  const comment = await prisma.comment.create({
    data: {
      title: req.body.title,
      body: req.body.content,
      author: {
        connect: {
          id: user.id
        }
      },
      post:{
        connect:{
          id: req.params.id
        }
      }
    }
  })

  res.json({message: message, comment: comment})
})

router.get('/article', async (req, res) => {
  const user = await prisma.user.findFirst({
    where: {
      token: req.headers.token
    },
  })
  let message = 'ok'
  if (!user) {
    message = 'User not found'
  }

  const posts = await prisma.post.findMany({
    where:{
      author:{
          id: user.id
      }
    }
  })
  console.log(posts)

  res.json({message: message, posts: posts})

})

router.get('/article/:id', async (req, res) => {
  const post = await prisma.post.findUnique({
    where:{
      id: req.params.id
    }
  })

  const comments = await prisma.comment.findMany({
    where:{
      post:{
        id: req.params.id
      }
    }
  })

  res.json({post: post, comments: comments})
})

module.exports = router;
