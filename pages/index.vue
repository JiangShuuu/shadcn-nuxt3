<template>
  <div class="flex flex-col h-screen space-y-5 items-center justify-center">
    <ClientOnly>
      <Carousel
        :plugins="[plugin]"
        @mouseenter="plugin.stop()"
        @mouseleave="[plugin.reset(), plugin.play(), console.log('Runing')]"
      >
        <CarouselContent class="text-center">
          <CarouselItem class="basis-1/3">Page01</CarouselItem>
          <CarouselItem class="basis-1/3">Page02</CarouselItem>
          <CarouselItem class="basis-1/3">Page03</CarouselItem>
          <CarouselItem class="basis-1/3">Page01</CarouselItem>
          <CarouselItem class="basis-1/3">Page02</CarouselItem>
          <CarouselItem class="basis-1/3">Page03</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </ClientOnly>
    <div class="space-x-3 flex items-center">
      <ClientOnly>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline"> Open popover </Button>
            <PopoverContent class="w-80">
              <div class="grid gap-4">
                <div class="space-y-2">
                  <h4 class="font-medium leading-none">Dimensions</h4>
                  <p class="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </p>
                </div>
                <div class="grid gap-2">
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label for="width">Width</Label>
                    <Input
                      id="width"
                      type="text"
                      default-value="100%"
                      class="col-span-2 h-8"
                    />
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label for="maxWidth">Max. width</Label>
                    <Input
                      id="maxWidth"
                      type="text"
                      default-value="300px"
                      class="col-span-2 h-8"
                    />
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label for="height">Height</Label>
                    <Input
                      id="height"
                      type="text"
                      default-value="25px"
                      class="col-span-2 h-8"
                    />
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label for="maxHeight">Max. height</Label>
                    <Input
                      id="maxHeight"
                      type="text"
                      default-value="none"
                      class="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </PopoverTrigger>
        </Popover>
      </ClientOnly>
      <Button variant="outline" @click="() => (open = true)"
        >Custom Dialog Btn</Button
      >
      <Button variant="outline" @click="clickToast"
        >Toast</Button
      >
    </div>
    <!-- Dialog -->
    <Dialog v-model:open="open">
      <!-- <DialogTrigger as-child>
        <Button variant="outline"> Open Dialog </Button>
      </DialogTrigger> -->
      <DialogContent
        class="p-0"
        @interact-outside.prevent
        @focus-outside.prevent
        @pointer-down-outside.prevent
      >
        <div class="form-box">
          <form class="form" @submit.prevent="startLoading">
            <span class="title">Sign up</span>
            <span class="subtitle"
              >Create a free account with your email.</span
            >
            <div class="form-container">
              <input type="text" class="input" placeholder="Full Name" />
              <input type="email" class="input" placeholder="Email" />
              <input type="password" class="input" placeholder="Password" />
            </div>
            <button type="submit">
              <p v-if="isLoading">isLoading</p>
              <p v-else>Sign Up</p>
            </button>
          </form>
          <div class="form-section">
            <p>Have an account? <a href="">Log in</a></p>
          </div>
        </div>
        <VisuallyHidden asChild>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription> </DialogDescription>
          </DialogHeader>
          <!-- <DialogFooter></DialogFooter> -->
        </VisuallyHidden>
      </DialogContent>
    </Dialog>
    <Pagination
      v-slot="{ page }"
      :total="100"
      :sibling-count="1"
      show-edges
      :default-page="2"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst />
        <PaginationPrev />

        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            class="test"
            as-child
          >
            <Button
              class="w-10 h-10 p-0"
              :variant="item.value === page ? 'default' : 'outline'"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext />
        <PaginationLast />
      </PaginationList>
    </Pagination>
  </div>
</template>

<script setup lang="ts">
import Autoplay from "embla-carousel-autoplay";
import { useToast } from "@/components/ui/toast/use-toast";
import { VisuallyHidden } from "radix-vue";
const { toast } = useToast();

const open = ref(false);
const isLoading = ref(false);
const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const startLoading = async () => {
  isLoading.value = true;
  try {
    await wait();
  } finally {
    isLoading.value = false;
    open.value = false;
  }
};
const plugin = Autoplay({
  delay: 2000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
});

const clickToast = () => {
  toast({
    title: "Scheduled: Catch up",
    description: "Friday, February 10, 2023 at 5:57 PM",
    duration: 1000,
  });
};
</script>

<style lang="postcss" scoped>
.test {
  width: 100px;
}

.form-box {
  max-width: 300px;
  background: #f1f7fe;
  overflow: hidden;
  border-radius: 16px;
  color: #010101;
}

.form {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px 24px 24px;
  gap: 16px;
  text-align: center;
}

/*Form text*/
.title {
  font-weight: bold;
  font-size: 1.6rem;
}

.subtitle {
  font-size: 1rem;
  color: #666;
}

/*Inputs box*/
.form-container {
  overflow: hidden;
  border-radius: 8px;
  background-color: #fff;
  margin: 1rem 0 0.5rem;
  width: 100%;
}

.input {
  background: none;
  border: 0;
  outline: 0;
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;
  padding: 8px 15px;
}

.form-section {
  padding: 16px;
  font-size: 0.85rem;
  background-color: #e0ecfb;
  box-shadow: rgb(0 0 0 / 8%) 0 -1px;
}

.form-section a {
  font-weight: bold;
  color: #0066ff;
  transition: color 0.3s ease;
}

.form-section a:hover {
  color: #005ce6;
  text-decoration: underline;
}

/*Button*/
.form button {
  background-color: #0066ff;
  color: #fff;
  border: 0;
  border-radius: 24px;
  padding: 10px 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form button:hover {
  background-color: #005ce6;
}
</style>
