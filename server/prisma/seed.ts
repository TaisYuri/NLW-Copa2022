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
      date: "2022-11-20T13:00:00.753Z", //new Date().toISOString()
      firstTeamCountryCode: "QA",
      secondTeamCountryCode: "EC",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-21T10:00:00.753Z",
      firstTeamCountryCode: "GB",
      secondTeamCountryCode: "IR",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-21T13:00:00.753Z",
      firstTeamCountryCode: "SN",
      secondTeamCountryCode: "NL",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-21T16:00:00.753Z",
      firstTeamCountryCode: "US",
      secondTeamCountryCode: "IE",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-22T07:00:00.753Z",
      firstTeamCountryCode: "SA",
      secondTeamCountryCode: "AR",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-22T10:00:00.753Z",
      firstTeamCountryCode: "DK",
      secondTeamCountryCode: "TN",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-22T13:00:00.753Z",
      firstTeamCountryCode: "MX",
      secondTeamCountryCode: "PL",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-22T16:00:00.753Z",
      firstTeamCountryCode: "FR",
      secondTeamCountryCode: "AU",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-23T10:00:00.753Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "JP",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-23T13:00:00.753Z",
      firstTeamCountryCode: "ES",
      secondTeamCountryCode: "CR",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-23T16:00:00.753Z",
      firstTeamCountryCode: "BE",
      secondTeamCountryCode: "CA",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-24T07:00:00.753Z",
      firstTeamCountryCode: "CH",
      secondTeamCountryCode: "CM",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-24T10:00:00.753Z",
      firstTeamCountryCode: "UY",
      secondTeamCountryCode: "KR",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-24T13:00:00.753Z",
      firstTeamCountryCode: "PT",
      secondTeamCountryCode: "GH",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-24T16:00:00.753Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "RS",
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
