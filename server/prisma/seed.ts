import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "john Doe",
      email: "john.doe@email.com",
      avatarUrl:
        "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Example Pool",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-14T12:00:00.753Z", //new Date().toISOString()
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "DE",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-12-05T12:00:00.753Z", //new Date().toISOString()
      firstTeamCountryCode: "AL",
      secondTeamCountryCode: "FR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-15T15:30:00.753Z",
      firstTeamCountryCode: "JP",
      secondTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
