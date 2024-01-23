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
      <Button variant="outline" @click="clickToast">Toast</Button>
      <Button variant="outline" @click="() => $router.push('/data-table')"
        >DataTable</Button
      >
    </div>
    <!-- Dialog -->
    <Dialog v-model:open="open">
      <!-- <DialogTrigger as-child>
        <Button variant="outline"> Open Dialog </Button>
      </DialogTrigger> -->
      <DialogContent
        class="p-0 rounded-2xl"
        @interact-outside.prevent
        @focus-outside.prevent
        @pointer-down-outside.prevent
      >
        <div class="w-[450px] p-10">
          <form @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="username">
              <FormItem class="relative">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="shadcn"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage class="absolute right-0 bottom-0"/>
              </FormItem>
            </FormField>
            <Button type="submit"><span v-if="!isLoading">Submit</span><span v-else>Loading...</span></Button>
          </form>
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
            class="w-[100px]"
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
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

const { toast } = useToast();
const open = ref(false);
const isLoading = ref(false);

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
    // variant: "destructive"
  });
};

// Form
const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
  })
);
const form = useForm({
  validationSchema: formSchema,
});
const onSubmit = form.handleSubmit(async(values) => {
  isLoading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Form submitted!", values);
  } finally {
    isLoading.value = false;
    open.value = false;
  }
});
</script>
