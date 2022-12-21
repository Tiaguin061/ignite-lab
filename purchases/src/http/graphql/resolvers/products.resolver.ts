import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Product } from '../models/Product';
import { ProductsService } from '../../../services/products.service';
import { CreateProductInput } from '../inputs/create-product-input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productsService.listAllProducts();
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Product)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.createProduct(data);
  }
}
