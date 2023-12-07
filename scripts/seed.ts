const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Кампьютер и информатика" },
                { name: "Музыка" },
                { name: "Фитнесс" },
                { name: "Фотография" },
                { name: "Бухгалтерский учет" },
                { name: "Инженерия" },
                { name: "Блогинг" },
            ]
        });
    } catch (error) {
        console.log("Ошибка при заполнении категорий базы данных.", error);
    } finally {
        await database.$disconnect();
    }
}

main();