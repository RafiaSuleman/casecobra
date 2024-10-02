"use server";

import { db } from '@/db';
import { OrderStatus } from '@prisma/client';

export const changeOrderStatus = async ({
  id,
  newStatus,
}: {
  id: string;
  newStatus: OrderStatus;
}) => {
  try {
    await db.order.update({
      where: { id },
      data: { status: newStatus },
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error('Failed to update order status');
  }
};
