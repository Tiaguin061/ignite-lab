import {
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Customer } from '../models/Customer';
import { CustomersService } from '../../../services/customers.service';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { PurchasesService } from '../../../services/purchases.service';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id);
  }

  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    return this.customersService.getCustomerByAuthUserId(reference.authUserId);
  }
}
