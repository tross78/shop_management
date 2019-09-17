<template>
  <div>
    <p>Online sales reports</p>
    <p>Order summary</p>
    <p>Order details by status</p>
    <p>Order by customers</p>
    <p>Weekly/Monthly order performance</p>
    <p>Total number of orders</p>
    <p>Total purchases</p>
    <p>Head office to have access to sale data globally</p>
    <p>Outlet to have access to their own sales data</p>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  name: "Reports"
};
</script>