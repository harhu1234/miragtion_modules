amount = fields.Float(string="Amount")


@api.onchange('offer_price')
    def check_price_offer(self):
        if self.offer_price > self.service_price:
            raise ValidationError('The offer price should not be higher than service price')
        self.amount = self.service_price - self.offer_price