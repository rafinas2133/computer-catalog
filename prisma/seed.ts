import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.banner.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  // Create Admin
  await prisma.user.create({
    data: {
      username: 'admin',
      password: 'securepassword', // Gunakan password hash di produksi
    },
  });

  // Create Banners
  await prisma.banner.createMany({
    data: [
      { title: "Welcome to PC Store", imageUrl: 'https://example.com/banner1.jpg' },
      { title: "Best Deals on GPUs", imageUrl: 'https://example.com/banner2.jpg' },
      { title: "Build Your Dream PC", imageUrl: 'https://example.com/banner3.jpg' },
    ],
  });

  // Create Main Categories
  const cpuCategory = await prisma.category.create({
    data: {
      name: 'CPU',
      imageUrl: 'https://example.com/cpu.jpg',
    },
  });

  const gpuCategory = await prisma.category.create({
    data: {
      name: 'GPU',
      imageUrl: 'https://example.com/gpu.jpg',
    },
  });

  // Create Subcategories for CPU
  const intelCategory = await prisma.category.create({
    data: {
      name: 'Intel',
      imageUrl: 'https://example.com/intel.jpg',
      parentId: cpuCategory.id,
    },
  });

  const amdCpuCategory = await prisma.category.create({
    data: {
      name: 'AMD',
      imageUrl: 'https://example.com/amd.jpg',
      parentId: cpuCategory.id,
    },
  });

  // Create Subcategories for GPU
  const nvidiaCategory = await prisma.category.create({
    data: {
      name: 'NVIDIA',
      imageUrl: 'https://example.com/nvidia.jpg',
      parentId: gpuCategory.id,
    },
  });

  const amdGpuCategory = await prisma.category.create({
    data: {
      name: 'AMD',
      imageUrl: 'https://example.com/amd-gpu.jpg',
      parentId: gpuCategory.id,
    },
  });

  // Create Products
  await prisma.product.createMany({
    data: [
      { name: 'Intel Core i9-13900K', description: 'High-performance CPU', price: 599, stock: 20, imageUrl: 'https://example.com/i9.jpg', categoryId: intelCategory.id },
      { name: 'Intel Core i7-13700K', description: 'Powerful gaming CPU', price: 449, stock: 25, imageUrl: 'https://example.com/i7.jpg', categoryId: intelCategory.id },

      { name: 'AMD Ryzen 9 7950X', description: 'Powerful AMD processor', price: 699, stock: 15, imageUrl: 'https://example.com/ryzen9.jpg', categoryId: amdCpuCategory.id },
      { name: 'AMD Ryzen 7 7700X', description: 'High-performance gaming CPU', price: 399, stock: 18, imageUrl: 'https://example.com/ryzen7.jpg', categoryId: amdCpuCategory.id },

      { name: 'NVIDIA RTX 4090', description: 'Ultimate gaming GPU', price: 1599, stock: 10, imageUrl: 'https://example.com/rtx4090.jpg', categoryId: nvidiaCategory.id },
      { name: 'NVIDIA RTX 4080', description: 'High-performance GPU', price: 1199, stock: 12, imageUrl: 'https://example.com/rtx4080.jpg', categoryId: nvidiaCategory.id },

      { name: 'AMD Radeon RX 7900 XT', description: 'High-end Radeon GPU', price: 999, stock: 12, imageUrl: 'https://example.com/rx7900xt.jpg', categoryId: amdGpuCategory.id },
      { name: 'AMD Radeon RX 7800 XT', description: 'Great gaming GPU', price: 699, stock: 14, imageUrl: 'https://example.com/rx7800xt.jpg', categoryId: amdGpuCategory.id },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
