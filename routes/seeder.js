const express = require('express')
const router = express.Router()
const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/seed', async (req, res) => {
    await prisma.$connect()

    await prisma.comment.deleteMany({})
    await prisma.post.deleteMany({})
    await prisma.category.deleteMany({})
    await prisma.user.deleteMany({})

    var post;
    const themeCategory = ['Société', 'Economie', 'Politique']
    themeCategory.forEach(async (theme) => {
        const category = await prisma.category.create({
            data:{
                theme: theme
            }
        })
        for (let i = 0; i < 5; i++) {
            const user = await prisma.user.create({
                data: {
                  name: faker.name.fullName(),
                  email: faker.internet.email(),
                  token: faker.internet.password(),
                  password: faker.internet.password(),
                  createdAt: faker.date.past()
                }
              })
    
    
    
              for (let j = 0; j < 5; j++) {
                    post = await prisma.post.create({
                        data:{
                            title: faker.lorem.words(3),
                            body: faker.lorem.paragraph(5),
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
                    
    
                for (let k = 0; k < 10; k++) {
                    const comment = await prisma.comment.create({
                        data: {
                          title: faker.lorem.words(3),
                          body: faker.lorem.paragraph(2),
                          author: {
                            connect: {
                              id: user.id
                            }
                          },
                          post:{
                            connect:{
                              id: post.id // post not defined
                            }
                          }
                        }
                      })
                  }
              }        
        }
    })
    
    
    
   

    
})

module.exports = router;